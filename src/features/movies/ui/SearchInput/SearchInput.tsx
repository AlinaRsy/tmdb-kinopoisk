import { ChangeEvent, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import s from "./SearchInput.module.css";
import { Path } from "@/common/routing";

export const SearchInput = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(queryParam);
  }, [queryParam]);

  const navigate = useNavigate();

  const isSubmitDisabled = !value.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    const query = value.trim();
    if (!query) return;
    navigate(`${Path.Search}?query=${encodeURIComponent(query)}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue === "") {
      navigate(Path.Search);
    }
  };
  return (
    <form className={s.form} onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className={s.input}
        placeholder="Search for a movie..."
        value={value}
        onChange={handleChange}
        aria-label="Movie title"
      />
      <button disabled={isSubmitDisabled} type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};
