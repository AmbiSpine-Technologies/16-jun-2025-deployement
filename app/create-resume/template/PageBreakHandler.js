"use client";
import React, { useRef, useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const PAGE_HEIGHT = 1000; // A4 page height
const ITEM_BUFFER = 5; // Minimal buffer for spacing

export default function PageBreakHandler({
  children,
  template = "professional",
}) {
  const contentRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    const calculatePages = () => {
      const content = contentRef.current;
      const sections = content.querySelectorAll(".page-section");

      console.log("🔍 Total sections found:", sections.length);

      if (sections.length === 0) {
        setPages([[0]]);
        setIsCalculated(true);
        return;
      }

      resetSections(sections);
      content.offsetHeight; // Force reflow

      const newPages = calculatePagesWithContentSplitting(
        content,
        Array.from(sections)
      );

      console.log(`📑 Final pages: ${newPages.length}`, newPages);
      setPages(newPages);
      setIsCalculated(true);

      if (newPages.length > 0) {
        showCurrentPage(newPages, 0);
      }
    };

    const resetSections = (sections) => {
      sections.forEach((section) => {
        section.style.cssText = `
          display: block !important;
          visibility: visible !important;
          position: relative !important;
          opacity: 1 !important;
          height: auto !important;
        `;

        const subsections = section.querySelectorAll(".page-subsection");
        subsections.forEach((subsection) => {
          subsection.style.cssText = `
            display: block !important;
            visibility: visible !important;
            position: relative !important;
            opacity: 1 !important;
            height: auto !important;
          `;
        });
      });
    };

    const calculatePagesWithContentSplitting = (content, allSections) => {
      const hasTwoColumns = content.querySelector(".two-column-layout");
      const leftColumn = content.querySelector(".left-column");
      const rightColumn = content.querySelector(".right-column");

      if (hasTwoColumns && leftColumn && rightColumn) {
        console.log("🔄 Two-column layout detected");
        return calculateTwoColumnPages(
          content,
          allSections,
          leftColumn,
          rightColumn
        );
      } else {
        console.log("🔄 Single-column layout detected");
        return calculateSingleColumnPages(allSections);
      }
    };

    const calculateSingleColumnPages = (sections) => {
      const pages = [];
      let currentPageItems = [];
      let currentHeight = 0;
      const sectionsWithHeaders = new Set();

      sections.forEach((section, sectionIndex) => {
        const subsections = section.querySelectorAll(".page-subsection");

        if (subsections.length > 0) {
          const sectionHeader = getSectionHeader(section);
          const headerHeight = sectionHeader
            ? getAccurateHeight(sectionHeader)
            : 0;

          // Add header only once per section
          if (headerHeight > 0 && !sectionsWithHeaders.has(sectionIndex)) {
            const availableSpace = PAGE_HEIGHT - currentHeight;

            // If header fits on current page, add it
            if (
              headerHeight <= availableSpace ||
              currentPageItems.length === 0
            ) {
              currentPageItems.push({
                type: "header",
                sectionIndex: sectionIndex,
                height: headerHeight,
              });
              currentHeight += headerHeight + ITEM_BUFFER;
              sectionsWithHeaders.add(sectionIndex);
              console.log(
                `📌 Header added: height=${headerHeight}px, new total=${currentHeight}px`
              );
            } else {
              // Move to new page with header
              console.log(
                `📄 New page for header (current=${currentHeight}px full)`
              );
              pages.push([...currentPageItems]);
              currentPageItems = [
                {
                  type: "header",
                  sectionIndex: sectionIndex,
                  height: headerHeight,
                },
              ];
              currentHeight = headerHeight + ITEM_BUFFER;
              sectionsWithHeaders.add(sectionIndex);
            }
          }

          // Process each subsection
          subsections.forEach((subsection, subIndex) => {
            const itemHeight = getAccurateHeight(subsection);
            const availableSpace = PAGE_HEIGHT - currentHeight;

            console.log(`\n📏 Subsection ${sectionIndex}-${subIndex}:`);
            console.log(`   Item height: ${itemHeight}px`);
            console.log(`   Current page height: ${currentHeight}px`);
            console.log(`   Available space: ${availableSpace}px`);

            // Case 1: Item completely fits on current page
            if (itemHeight <= availableSpace) {
              currentPageItems.push({
                type: "subsection",
                sectionIndex: sectionIndex,
                subIndex: subIndex,
                height: itemHeight,
                fullItem: true,
              });
              currentHeight += itemHeight + ITEM_BUFFER;
              console.log(
                `   ✅ Added to current page. New height: ${currentHeight}px`
              );
            }
            // Case 2: Item doesn't fit but is smaller than full page - move to fresh page
            else if (itemHeight <= PAGE_HEIGHT && currentPageItems.length > 0) {
              console.log(
                `   📄 Item too big for current page, starting fresh page`
              );
              pages.push([...currentPageItems]);
              currentPageItems = [
                {
                  type: "subsection",
                  sectionIndex: sectionIndex,
                  subIndex: subIndex,
                  height: itemHeight,
                  fullItem: true,
                },
              ];
              currentHeight = itemHeight + ITEM_BUFFER;
              console.log(
                `   ✅ Added to new page. Height: ${currentHeight}px`
              );
            }
            // Case 3: Item is larger than full page - allow natural CSS overflow
            else {
              console.log(
                `   ⚠️ Large item (>${PAGE_HEIGHT}px) - allowing natural overflow`
              );
              currentPageItems.push({
                type: "subsection",
                sectionIndex: sectionIndex,
                subIndex: subIndex,
                height: itemHeight,
                fullItem: true,
                allowOverflow: true,
              });
              currentHeight += itemHeight + ITEM_BUFFER;
              console.log(
                `   ✅ Added with overflow. Height: ${currentHeight}px`
              );
            }
          });
        } else {
          // Section without subsections - handle as single block
          const sectionHeight = getAccurateHeight(section);
          const availableSpace = PAGE_HEIGHT - currentHeight;

          console.log(
            `\n📦 Full section ${sectionIndex}: height=${sectionHeight}px, available=${availableSpace}px`
          );

          if (sectionHeight <= availableSpace) {
            currentPageItems.push({
              type: "section",
              sectionIndex: sectionIndex,
              height: sectionHeight,
            });
            currentHeight += sectionHeight + ITEM_BUFFER;
            console.log(`   ✅ Section added to current page`);
          } else if (
            sectionHeight <= PAGE_HEIGHT &&
            currentPageItems.length > 0
          ) {
            pages.push([...currentPageItems]);
            currentPageItems = [
              {
                type: "section",
                sectionIndex: sectionIndex,
                height: sectionHeight,
              },
            ];
            currentHeight = sectionHeight + ITEM_BUFFER;
            console.log(`   📄 Section moved to new page`);
          } else {
            currentPageItems.push({
              type: "section",
              sectionIndex: sectionIndex,
              height: sectionHeight,
              allowOverflow: true,
            });
            currentHeight += sectionHeight + ITEM_BUFFER;
            console.log(`   ⚠️ Large section with overflow`);
          }
        }
      });

      // Add remaining items as last page
      if (currentPageItems.length > 0) {
        pages.push(currentPageItems);
        console.log(`\n📄 Final page created with height: ${currentHeight}px`);
      }

      return pages;
    };

    const calculateTwoColumnPages = (
      content,
      allSections,
      leftColumn,
      rightColumn
    ) => {
      const leftSections = Array.from(
        leftColumn.querySelectorAll(".page-section")
      );
      const rightSections = Array.from(
        rightColumn.querySelectorAll(".page-section")
      );
      const outsideSections = allSections.filter(
        (section) =>
          !leftColumn.contains(section) && !rightColumn.contains(section)
      );

      const leftPages = calculateColumnPages(leftSections, allSections);
      const rightPages = calculateColumnPages(rightSections, allSections);
      const outsidePages = calculateSingleColumnPages(outsideSections);

      return mergePagesOptimally(outsidePages, leftPages, rightPages);
    };

    const calculateColumnPages = (columnSections, allSections) => {
      if (columnSections.length === 0) return [];

      const pages = [];
      let currentPageItems = [];
      let currentHeight = 0;
      const sectionsWithHeaders = new Set();

      columnSections.forEach((section) => {
        const sectionIndex = allSections.indexOf(section);
        const subsections = section.querySelectorAll(".page-subsection");

        if (subsections.length > 0) {
          const sectionHeader = getSectionHeader(section);
          const headerHeight = sectionHeader
            ? getAccurateHeight(sectionHeader)
            : 0;

          if (headerHeight > 0 && !sectionsWithHeaders.has(sectionIndex)) {
            const availableSpace = PAGE_HEIGHT - currentHeight;

            if (
              headerHeight <= availableSpace ||
              currentPageItems.length === 0
            ) {
              currentPageItems.push({
                type: "header",
                sectionIndex: sectionIndex,
                height: headerHeight,
              });
              currentHeight += headerHeight + ITEM_BUFFER;
              sectionsWithHeaders.add(sectionIndex);
            } else {
              pages.push([...currentPageItems]);
              currentPageItems = [
                {
                  type: "header",
                  sectionIndex: sectionIndex,
                  height: headerHeight,
                },
              ];
              currentHeight = headerHeight + ITEM_BUFFER;
              sectionsWithHeaders.add(sectionIndex);
            }
          }

          subsections.forEach((subsection, subIndex) => {
            const itemHeight = getAccurateHeight(subsection);
            const availableSpace = PAGE_HEIGHT - currentHeight;

            if (itemHeight <= availableSpace) {
              currentPageItems.push({
                type: "subsection",
                sectionIndex: sectionIndex,
                subIndex: subIndex,
                height: itemHeight,
                fullItem: true,
              });
              currentHeight += itemHeight + ITEM_BUFFER;
            } else if (
              itemHeight <= PAGE_HEIGHT &&
              currentPageItems.length > 0
            ) {
              pages.push([...currentPageItems]);
              currentPageItems = [
                {
                  type: "subsection",
                  sectionIndex: sectionIndex,
                  subIndex: subIndex,
                  height: itemHeight,
                  fullItem: true,
                },
              ];
              currentHeight = itemHeight + ITEM_BUFFER;
            } else {
              currentPageItems.push({
                type: "subsection",
                sectionIndex: sectionIndex,
                subIndex: subIndex,
                height: itemHeight,
                fullItem: true,
                allowOverflow: true,
              });
              currentHeight += itemHeight + ITEM_BUFFER;
            }
          });
        } else {
          const sectionHeight = getAccurateHeight(section);
          const availableSpace = PAGE_HEIGHT - currentHeight;

          if (sectionHeight <= availableSpace) {
            currentPageItems.push({
              type: "section",
              sectionIndex: sectionIndex,
              height: sectionHeight,
            });
            currentHeight += sectionHeight + ITEM_BUFFER;
          } else if (
            sectionHeight <= PAGE_HEIGHT &&
            currentPageItems.length > 0
          ) {
            pages.push([...currentPageItems]);
            currentPageItems = [
              {
                type: "section",
                sectionIndex: sectionIndex,
                height: sectionHeight,
              },
            ];
            currentHeight = sectionHeight + ITEM_BUFFER;
          } else {
            currentPageItems.push({
              type: "section",
              sectionIndex: sectionIndex,
              height: sectionHeight,
              allowOverflow: true,
            });
            currentHeight += sectionHeight + ITEM_BUFFER;
          }
        }
      });

      if (currentPageItems.length > 0) {
        pages.push(currentPageItems);
      }

      return pages;
    };

    const getSectionHeader = (section) => {
      return section.querySelector("h2, h3");
    };

    const getAccurateHeight = (element) => {
      const height = element.offsetHeight;
      const style = window.getComputedStyle(element);
      const marginTop = parseInt(style.marginTop) || 0;
      const marginBottom = parseInt(style.marginBottom) || 0;

      return height + marginTop + marginBottom;
    };

    const mergePagesOptimally = (outsidePages, leftPages, rightPages) => {
      const allPages = [];
      const maxPages = Math.max(
        outsidePages.length,
        leftPages.length,
        rightPages.length
      );

      for (let pageIndex = 0; pageIndex < maxPages; pageIndex++) {
        const pageItems = [];

        if (outsidePages[pageIndex]) {
          pageItems.push(...outsidePages[pageIndex]);
        }
        if (leftPages[pageIndex]) {
          pageItems.push(...leftPages[pageIndex]);
        }
        if (rightPages[pageIndex]) {
          pageItems.push(...rightPages[pageIndex]);
        }

        if (pageItems.length > 0) {
          allPages.push(pageItems);
        }
      }

      return allPages;
    };

    const timer = setTimeout(() => {
      calculatePages();
    }, 500);

    return () => clearTimeout(timer);
  }, [children, template]);

  const showCurrentPage = (pagesArray, pageIndex) => {
    if (!contentRef.current || !pagesArray[pageIndex]) return;

    const content = contentRef.current;
    const sections = content.querySelectorAll(".page-section");

    // Hide everything first
    sections.forEach((section) => {
      section.style.display = "none";
      section.style.visibility = "hidden";

      const subsections = section.querySelectorAll(".page-subsection");
      subsections.forEach((subsection) => {
        subsection.style.display = "none";
        subsection.style.visibility = "hidden";
      });
    });

    // Track visible items
    const visibleSections = new Set();
    const visibleSubsections = new Map();

    pagesArray[pageIndex].forEach((item) => {
      if (item.type === "section") {
        visibleSections.add(item.sectionIndex);
      } else if (item.type === "header" || item.type === "subsection") {
        visibleSections.add(item.sectionIndex);

        if (item.type === "subsection") {
          if (!visibleSubsections.has(item.sectionIndex)) {
            visibleSubsections.set(item.sectionIndex, new Set());
          }
          visibleSubsections.get(item.sectionIndex).add(item.subIndex);
        }
      }
    });

    // Show visible sections and items
    visibleSections.forEach((sectionIndex) => {
      const section = sections[sectionIndex];
      if (!section) return;

      section.style.display = "block";
      section.style.visibility = "visible";

      const subsections = section.querySelectorAll(".page-subsection");
      if (visibleSubsections.has(sectionIndex)) {
        const visibleIndices = visibleSubsections.get(sectionIndex);
        subsections.forEach((subsection, subIndex) => {
          if (visibleIndices.has(subIndex)) {
            subsection.style.display = "block";
            subsection.style.visibility = "visible";
          }
        });
      }
    });

    console.log(`👁️ Showing page ${pageIndex + 1}/${pagesArray.length}`);
  };

  useEffect(() => {
    if (pages.length > 0 && isCalculated) {
      showCurrentPage(pages, currentPage);
    }
  }, [currentPage, pages, isCalculated]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="pagination-container relative">
      {/* Screen View */}
      <div className="screen-view">
        <div
          ref={contentRef}
          className="resume-container bg-white mx-auto"
          style={{
            width: "100%",
            minHeight: "297mm",
            margin: "0 auto",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>

      {/* Pagination Controls */}
      {pages.length > 1 && (
        <div className="flex justify-center mt-6 mb-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-lg border border-gray-300">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-2 border border-gray-300 text-gray-700 rounded-lg transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GrFormPrevious className="text-lg" />
            </button>

            <span className="font-semibold text-gray-800 text-sm min-w-[120px] text-center">
              Page {currentPage + 1} of {pages.length}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdOutlineNavigateNext className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* Print View */}
      <div className="print-view hidden">
        {pages.map((pageItems, pageIndex) => (
          <div
            key={`print-page-${pageIndex}`}
            className="resume-page bg-white"
            style={{
              width: "100%",
              minHeight: "297mm",
              margin: "0 auto",
              padding: "20px",
              pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
            }}
          >
            {pageItems.map((item, itemIndex) => {
              const sections =
                contentRef.current?.querySelectorAll(".page-section");
              if (!sections) return null;

              const section = sections[item.sectionIndex];
              if (!section) return null;

              if (item.type === "section") {
                return (
                  <div
                    key={`print-item-${itemIndex}`}
                    dangerouslySetInnerHTML={{ __html: section.innerHTML }}
                  />
                );
              } else if (item.type === "header") {
                const header = section.querySelector("h2, h3");
                return header ? (
                  <div
                    key={`print-header-${itemIndex}`}
                    dangerouslySetInnerHTML={{ __html: header.outerHTML }}
                  />
                ) : null;
              } else if (item.type === "subsection") {
                const subsections =
                  section.querySelectorAll(".page-subsection");
                const subsection = subsections[item.subIndex];
                return subsection ? (
                  <div
                    key={`print-subsection-${itemIndex}`}
                    style={{
                      pageBreakInside: item.allowOverflow ? "auto" : "avoid",
                    }}
                    dangerouslySetInnerHTML={{ __html: subsection.innerHTML }}
                  />
                ) : null;
              }
              return null;
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        @media print {
          .pagination-container,
          .screen-view {
            display: none !important;
          }
          .print-view {
            display: block !important;
          }
          .resume-page {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
            border: none !important;
          }
        }

        /* Allow natural overflow for large items */
        .page-subsection {
          break-inside: auto;
        }
      `}</style>
    </div>
  );
}
