export const PAGE_SIZE_OPTIONS = [10, 25, 50];

// 25 keeps every one of the 12 mock Pokemon on the first page, preserving the previous "all visible" default
export const DEFAULT_PAGE_SIZE = 25;

export const normalizePageSize = (value) => {
  const size = Number.parseInt(value, 10);
  return PAGE_SIZE_OPTIONS.includes(size) ? size : DEFAULT_PAGE_SIZE;
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil((Number(totalItems) || 0) / normalizePageSize(pageSize)));

export const clampPage = (page, totalPages) =>
  Math.min(Math.max(1, Number.parseInt(page, 10) || 1), Math.max(1, totalPages));

export const paginate = (items, page, pageSize) => {
  const list = Array.isArray(items) ? items : [];
  const size = normalizePageSize(pageSize);
  const current = clampPage(page, getTotalPages(list.length, size));
  const start = (current - 1) * size;
  return list.slice(start, start + size);
};
