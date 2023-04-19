import RecipeCard from "../RecipeList/RecipeCard";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useRecipeSearch from "../../hooks/useRecipeSearch";

function Recipes({ currentItems }) {
  return (
    <>
      <table className="table-compact">
        {currentItems &&
          currentItems.map((item) => {
            return (
              <>
                {" "}
                <RecipeCard key={item.url} recipe={item} />
                <div className="divider divider-vertical">OR</div>{" "}
              </>
            );
          })}
      </table>
    </>
  );
}

function PaginationComp({ itemsPerPage, items, setNext, setNextUrl }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [itemOffset, setItemOffset] = useState(0);
  const [nextPageUrl,setNextPageUrl] = useState([])
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items?.results?.slice(itemOffset, endOffset);
  console.log(items)
  const pageCount = Math.ceil(items?.totalResults / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.number;
    console.log(newOffset)
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
   
    setItemOffset(newOffset);
  };

  return (
    <>
      <Recipes currentItems={currentItems} />
      <ReactPaginate
        className="btn-group w-fit mx-auto flex justify-center p-10"
        pageClassName="btn"
        breakClassName="btn"
        previousClassName="btn"
        nextClassName="btn"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginationComp;
