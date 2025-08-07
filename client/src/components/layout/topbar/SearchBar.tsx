import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    width: "200px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "250px",
  },
  [theme.breakpoints.up("md")]: {
    width: "300px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&::placeholder": {
      opacity: 0.7,
    },
  },
}));

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        sx={{
          color: "inherit",
          "& .MuiInputBase-input": {
            padding: "8px 8px 8px 40px",
            paddingLeft: isRTL ? "8px" : "40px",
            paddingRight: isRTL ? "40px" : "8px",
            transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            width: "100%",
            textAlign: isRTL ? "right" : "left",
          },
        }}
      />
    </Search>
  );
};

export default SearchBar;
