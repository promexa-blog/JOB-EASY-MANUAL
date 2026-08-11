"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Crosshair,
} from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<any>(null);

  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "var(--font-mono)",
      er: {
        diagramPadding: 20,
        layoutDirection: "TB",
        minEntityWidth: 100,
        minEntityHeight: 60,
        entityPadding: 12,
        stroke: "var(--color-border-strong)",
        fill: "var(--color-bg)",
        fontSize: 12,
        useMaxWidth: false,
      },
    });
  }, []);

  /**
   * Fit and center the complete diagram.
   * Slightly zoomed in so the ERD remains readable.
   */
  const fitDiagram = (scaleOverride?: number) => {
    const container = containerRef.current;
    const diagram = ref.current;
    const wrapper = transformRef.current;

    if (!container || !diagram || !wrapper) return;

    const svg = diagram.querySelector("svg");
    if (!svg) return;

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();

      const svgWidth =
        parseFloat(svg.getAttribute("width") || "0") ||
        svg.viewBox?.baseVal?.width ||
        svg.getBoundingClientRect().width;

      const svgHeight =
        parseFloat(svg.getAttribute("height") || "0") ||
        svg.viewBox?.baseVal?.height ||
        svg.getBoundingClientRect().height;

      if (!svgWidth || !svgHeight) return;

      /*
       * Keep comfortable breathing room around the diagram.
       */
      const padding = isFullscreen ? 90 : 70;

      const availableWidth =
        containerRect.width - padding * 2;

      const availableHeight =
        containerRect.height - padding * 2;

      /*
       * Calculate the scale required to fit both
       * width and height.
       */
      const widthScale = availableWidth / svgWidth;
      const heightScale = availableHeight / svgHeight;

      /*
       * Slightly zoom in compared to the previous version.
       * 1.15 gives better readability while maintaining fit.
       */
      const fitScale =
        Math.min(widthScale, heightScale) * 1.15;

      const scale =
        scaleOverride ??
        Math.max(
          0.1,
          Math.min(fitScale, 1.5)
        );

      /*
       * Perfect horizontal + vertical centering.
       */
      const scaledWidth = svgWidth * scale;
      const scaledHeight = svgHeight * scale;

      const x =
        (containerRect.width - scaledWidth) / 2;

      const y =
        (containerRect.height - scaledHeight) / 2;

      wrapper.setTransform(
        x,
        y,
        scale,
        600
      );
    });
  };

  /*
   * Render Mermaid diagram.
   */
  useEffect(() => {
    if (!ref.current || !chart) return;

    setHasError(false);

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 10)}`;

        const result = await mermaid.render(
          id,
          chart
        );

        if (!ref.current) return;

        ref.current.innerHTML = result.svg;

        /*
         * Wait for Mermaid SVG to be painted
         * before calculating dimensions.
         */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fitDiagram();
          });
        });
      } catch (error) {
        console.error(
          "Mermaid rendering error:",
          error
        );

        setHasError(true);
      }
    };

    renderDiagram();
  }, [chart]);

  /*
   * Re-fit when browser size changes.
   */
  useEffect(() => {
    const handleResize = () => {
      fitDiagram();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [isFullscreen]);

  /*
   * Re-fit after entering/exiting fullscreen.
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement
      );

      setTimeout(() => {
        fitDiagram();
      }, 200);
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        group relative w-full overflow-hidden
        bg-[var(--color-bg)]
        ${
          isFullscreen
            ? "h-screen"
            : "h-[80vh] min-h-[600px] rounded-xl border border-[var(--color-border)]"
        }
      `}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              rounded-lg
              border border-red-500/20
              bg-red-500/10
              px-5 py-4
              text-sm text-red-500
            "
          >
            Failed to render diagram.
            Check the console for syntax errors.
          </div>
        </div>
      ) : (
        <TransformWrapper
          ref={transformRef}
          initialScale={0.5}
          minScale={0.05}
          maxScale={3}
          centerOnInit={false}
          wheel={{
            step: 0.08,
          }}
          doubleClick={{
            disabled: true,
          }}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              {/* Diagram Controls */}
              <div
                className="
                  absolute
                  right-5
                  top-5
                  z-20
                  flex
                  gap-1.5
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-bg-elevated)]/95
                  p-1.5
                  shadow-lg
                  backdrop-blur
                  opacity-0
                  transition-opacity
                  group-hover:opacity-100
                "
              >
                {/* Zoom In */}
                <button
                  type="button"
                  onClick={() => zoomIn(0.2)}
                  className="
                    rounded-lg
                    p-2
                    text-[var(--color-fg-muted)]
                    transition
                    hover:bg-[var(--color-bg-subtle)]
                    hover:text-[var(--color-fg)]
                  "
                  title="Zoom In"
                >
                  <ZoomIn size={17} />
                </button>

                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={() => zoomOut(0.2)}
                  className="
                    rounded-lg
                    p-2
                    text-[var(--color-fg-muted)]
                    transition
                    hover:bg-[var(--color-bg-subtle)]
                    hover:text-[var(--color-fg)]
                  "
                  title="Zoom Out"
                >
                  <ZoomOut size={17} />
                </button>

                {/* Fit / Center */}
                <button
                  type="button"
                  onClick={() => fitDiagram()}
                  className="
                    rounded-lg
                    p-2
                    text-[var(--color-fg-muted)]
                    transition
                    hover:bg-[var(--color-bg-subtle)]
                    hover:text-[var(--color-fg)]
                  "
                  title="Fit Diagram"
                >
                  <Crosshair size={17} />
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="
                    rounded-lg
                    p-2
                    text-[var(--color-fg-muted)]
                    transition
                    hover:bg-[var(--color-bg-subtle)]
                    hover:text-[var(--color-fg)]
                  "
                  title="Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize size={17} />
                  ) : (
                    <Maximize size={17} />
                  )}
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                <div
                  ref={ref}
                  className="
                    mermaid-container
                    cursor-grab
                    select-none
                    active:cursor-grabbing
                  "
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )}
    </div>
  );
}