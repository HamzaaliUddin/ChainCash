import cn from "classnames";
import styles from "./Pagination.module.sass";
import Icon from "@/components/Icon";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const generatePageNumbers = () => {
        const pages = [];
        const totalPagesToShow = 5; // Number of pages to show in pagination

        let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

        if (totalPagesToShow > totalPages) {
            startPage = 1;
            endPage = totalPages;
        } else if (endPage - startPage + 1 < totalPagesToShow) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - totalPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };
    return (
        <div className={styles.pagination}>
            <button
                className={styles.prev}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Icon name="arrow-prev" size="20" />
            </button>
            {generatePageNumbers().map((page) => (
                <button
                    key={page}
                    className={cn(styles.number, { [styles.active]: page === currentPage })}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.next}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <Icon name="arrow-next" size="20" />
            </button>
        </div>
    );
};

export default Pagination;
