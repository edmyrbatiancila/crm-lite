import { PaginationLinkItem } from "@/types/global";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface IPagePagination {
    links: PaginationLinkItem[];
}

const PagePagination = ({ links }: IPagePagination) => {

    if (!links || links.length === 0) return null;

     // Determine first and last link availability
    const prevLink = links.find((l) => l.label === "&laquo; Previous");
    const nextLink = links.find((l) => l.label === "Next &raquo;");

    return (
        <div className="sticky bottom-0 left-0w-full border-t dark:border-gray-700 shadow-sm py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm mt-auto z-[1]">
            <Pagination>
                <PaginationContent className="flex justify-center">
                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            href={prevLink?.url || "#"}
                            className={!prevLink?.url ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* Middle numbers */}
                    {links
                        .filter(
                            (link) =>
                            link.label !== "&laquo; Previous" &&
                            link.label !== "Next &raquo;"
                        )
                        .map((link, idx) => {
                            if (link.label.includes("...")) {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )
                            }
                            return (
                                <PaginationItem key={idx}>
                                    <PaginationLink
                                        href={link.url || "#"}
                                        isActive={link.active}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                </PaginationItem>
                            )
                        })
                    }

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            href={nextLink?.url || "#"}
                            className={!nextLink?.url ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
        
    );
}

export default PagePagination;