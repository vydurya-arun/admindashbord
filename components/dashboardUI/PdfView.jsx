"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack"; // ensures worker bundling

const PdfView = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1); // only first page
        const viewport = page.getViewport({ scale: 0.2 }); // small thumbnail
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        console.error("PDF render error:", err);
      }
    };

    renderPdf();
  }, [url]);

  return <canvas ref={canvasRef} className="rounded-md border" />;
};

export default PdfView