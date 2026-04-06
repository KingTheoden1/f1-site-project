"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { DriverProgression } from "@/lib/f1-data";

interface Props {
  progressions: DriverProgression[];
}

const MAX_DRIVERS = 8;

export default function PointsProgressionChart({ progressions }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // Store current width in a ref so ResizeObserver doesn't cause re-renders
  const widthRef = useRef(800);

  const drivers = progressions.slice(0, MAX_DRIVERS);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || drivers.length === 0) return;

    const draw = (w: number) => {
      const height = 320;
      const margin = { top: 16, right: 80, bottom: 36, left: 44 };
      const innerW = w - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll("*").remove();

      const allRounds = drivers.flatMap((d) => d.rounds.map((r) => r.round));
      const allPoints = drivers.flatMap((d) => d.rounds.map((r) => r.points));

      const xScale = d3
        .scaleLinear()
        .domain([Math.min(...allRounds), Math.max(...allRounds)])
        .range([0, innerW]);

      const yScale = d3
        .scaleLinear()
        .domain([0, Math.max(...allPoints) * 1.05])
        .range([innerH, 0])
        .nice();

      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Grid lines
      g.append("g")
        .call(
          d3.axisLeft(yScale).tickSize(-innerW).tickFormat(() => "").ticks(5)
        )
        .call((axis) => {
          axis.select(".domain").remove();
          axis
            .selectAll("line")
            .attr("stroke", "#27272a")
            .attr("stroke-dasharray", "2,4");
        });

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(Math.min(Math.max(...allRounds), 10))
            .tickFormat((d) => `R${d}`)
        )
        .call((axis) => {
          axis.select(".domain").attr("stroke", "#3f3f46");
          axis.selectAll("text").attr("fill", "#71717a").attr("font-size", "11px");
          axis.selectAll("line").attr("stroke", "#3f3f46");
        });

      // Y axis
      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .call((axis) => {
          axis.select(".domain").remove();
          axis.selectAll("text").attr("fill", "#71717a").attr("font-size", "11px");
          axis.selectAll("line").remove();
        });

      const line = d3
        .line<{ round: number; points: number }>()
        .x((d) => xScale(d.round))
        .y((d) => yScale(d.points))
        .curve(d3.curveMonotoneX);

      const tooltip = tooltipRef.current;

      const fadeAll = () => {
        g.selectAll<SVGPathElement, unknown>(".driver-line")
          .attr("opacity", 0.85)
          .attr("stroke-width", 2);
      };

      const highlight = (code: string) => {
        g.selectAll<SVGPathElement, unknown>(".driver-line").attr("opacity", 0.08);
        g.select<SVGPathElement>(`.driver-line-${code}`)
          .attr("opacity", 1)
          .attr("stroke-width", 2.5);
      };

      // Draw lines
      drivers.forEach((driver) => {
        const safeCode = driver.code.replace(/[^a-zA-Z0-9]/g, "_");

        const path = g
          .append("path")
          .datum(driver.rounds)
          .attr("class", `driver-line driver-line-${safeCode}`)
          .attr("fill", "none")
          .attr("stroke", driver.teamColor)
          .attr("stroke-width", 2)
          .attr("d", line)
          .attr("opacity", 0.85);

        // Draw-in animation
        const totalLength = (path.node() as SVGPathElement)?.getTotalLength() ?? 0;
        path
          .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(900)
          .ease(d3.easeCubicOut)
          .attr("stroke-dashoffset", 0);

        // End-of-line dot
        const last = driver.rounds[driver.rounds.length - 1];
        if (last) {
          g.append("circle")
            .attr("cx", xScale(last.round))
            .attr("cy", yScale(last.points))
            .attr("r", 3.5)
            .attr("fill", driver.teamColor)
            .attr("stroke", "#09090b")
            .attr("stroke-width", 1.5);
        }

        // Hit-area dots per round
        driver.rounds.forEach((round) => {
          g.append("circle")
            .attr("cx", xScale(round.round))
            .attr("cy", yScale(round.points))
            .attr("r", 7)
            .attr("fill", "transparent")
            .style("cursor", "pointer")
            .on("mouseenter", (event: MouseEvent) => {
              highlight(safeCode);

              if (!tooltip || !containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              tooltip.style.display = "block";
              tooltip.style.left = `${event.clientX - rect.left + 12}px`;
              tooltip.style.top = `${event.clientY - rect.top - 48}px`;
              tooltip.style.borderColor = `${driver.teamColor}50`;
              tooltip.innerHTML = `
                <p style="font-weight:600;color:${driver.teamColor}">${driver.name}</p>
                <p style="color:#a1a1aa;font-size:11px">${round.raceName}</p>
                <p style="font-family:monospace;font-weight:700;color:#fff">${round.points} pts</p>
              `;
            })
            .on("mouseleave", () => {
              fadeAll();
              if (tooltip) tooltip.style.display = "none";
            });
        });
      });

      // Right-edge driver labels
      [...drivers]
        .sort(
          (a, b) =>
            (b.rounds[b.rounds.length - 1]?.points ?? 0) -
            (a.rounds[a.rounds.length - 1]?.points ?? 0)
        )
        .forEach((driver) => {
          const last = driver.rounds[driver.rounds.length - 1];
          if (!last) return;
          g.append("text")
            .attr("x", xScale(last.round) + 8)
            .attr("y", yScale(last.points) + 4)
            .attr("fill", driver.teamColor)
            .attr("font-size", "11px")
            .attr("font-weight", "600")
            .text(driver.code);
        });
    };

    // Initial draw
    const initialWidth = containerRef.current.clientWidth;
    widthRef.current = initialWidth;
    draw(initialWidth);

    // Redraw on resize
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (Math.abs(w - widthRef.current) > 4) {
        widthRef.current = w;
        draw(w);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [drivers]);

  if (drivers.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 p-8 text-center">
        <p className="text-zinc-600 text-sm">No race data yet for this season.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Points Progression</h3>
        <span className="text-xs text-zinc-600">
          Top {Math.min(drivers.length, MAX_DRIVERS)} drivers · 2026 season
        </span>
      </div>

      <div ref={containerRef} className="relative px-2 pt-2 pb-1">
        <svg ref={svgRef} className="w-full" />

        {/* Tooltip — shown/hidden via DOM, no React re-renders */}
        <div
          ref={tooltipRef}
          className="absolute z-10 pointer-events-none px-3 py-2 rounded-lg border text-xs shadow-lg"
          style={{
            display: "none",
            backgroundColor: "#18181b",
            color: "#e4e4e7",
          }}
        />
      </div>

      {/* Legend */}
      <div className="px-5 py-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-zinc-800/60">
        {drivers.map((d) => (
          <div key={d.code} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.teamColor }}
            />
            <span className="text-zinc-400 text-xs">{d.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
