import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import s from "./SearchInput.module.css";
import { Path } from "@/common/routing";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const isSubmitDisabled = !value.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return; 
    const query = value.trim();
    if (!query) return;
    navigate(`${Path.Search}?query=${encodeURIComponent(query)}`);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className={s.input}
        placeholder="Search for a movie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Movie title"
      />
      <button disabled={isSubmitDisabled} type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};