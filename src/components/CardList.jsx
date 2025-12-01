// src/components/CardList.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(data.length);

  // Handle search input from <Search />
  const handleSearch = (term) => {
    setSearchTerm(term);    // we'll normalize it in the effect
    setOffset(0);           // always go back to first page when searching
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    setOffset((prev) => {
      const nextOffset = prev + limit;
      if (nextOffset >= totalCount) return prev; // don't go past end
      return nextOffset;
    });
  };

  useEffect(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    // Filter by tags if a search term is present
    const filtered = data.filter((product) => {
      if (!normalizedTerm) return true; // no search -> keep all

      const tags = product.tags || [];
      return tags.some((tag) =>
        String(tag).toLowerCase().includes(normalizedTerm)
      );
    });

    setTotalCount(filtered.length);

    // Ensure offset is not out of range after filtering
    const maxOffset = Math.max(filtered.length - limit, 0);
    const safeOffset = Math.min(offset, maxOffset);

    const nextPageItems = filtered.slice(safeOffset, safeOffset + limit);

    if (safeOffset !== offset) {
      setOffset(safeOffset);
    }

    setProducts(nextPageItems);
  }, [data, offset, limit, searchTerm]);

  const isFirstPage = offset === 0;
  const isLastPage = offset + limit >= totalCount;

  return (
    <div className="cf pa2">
      {/* Search bar */}
      <div className="mt2 mb2">
        {/* Expecting Search to call handleSearch(term) on change/submit */}
        <Search handleSearch={handleSearch} />
      </div>

      {/* Cards */}
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}

        {products.length === 0 && (
          <p className="tc mt4">
            No products found matching those tags.
          </p>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={handlePrevious}
          disabled={isFirstPage}
        />
        <Button
          text="Next"
          handleClick={handleNext}
          disabled={isLastPage}
        />
      </div>
    </div>
  );
};

export default CardList;