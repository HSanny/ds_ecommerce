import React from "react"
import { TextField, Button } from "@mui/material"

type SearchFilterProps = {
    value: string,
    onChange: (value: string) => void
}

const SearchFilter: React.FC<SearchFilterProps> = ({ value, onChange }) => {

    const [searchTerm, setSearchTerm] = React.useState(value)

    return (
        <div>
            <TextField
                label="Search"
                variant="filled"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => onChange(searchTerm)}
            >
                Search
            </Button>
        </div>
    )
}

export default SearchFilter