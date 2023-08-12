export const getPageCount = (totalCount, limit) => {
    if (limit === "-1") return 1;
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) result.push(i + 1);
    return result;
}