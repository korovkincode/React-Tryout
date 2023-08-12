import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = (props) => { 
    const [selectedSort, setSelectedSort] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filterPosts = (e) => {
        props.filter(e.target.value);
        setSearchQuery(e.target.value);
    }
    const sortPosts = (e) => {
        props.sort(e);
        setSelectedSort(e);
    }

    return (
        <div>
            <MyInput 
                placeholder="Поиск"
                value={searchQuery}
                onChange={filterPosts}
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: "title", name: "По названию"},
                    {value: "body", name: "По описанию"}
                ]}
            />
        </div>
    )
}

export default PostFilter;