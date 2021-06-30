import { useEffect, useState } from "react";
import { getHttp, mainUrl, postHttp, putHttp } from "../utils/httpWraper";

const CategoriesForm = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    getHttp(`${mainUrl}/categories`).then((result) => {
      setCategoriesList(result.data);
    });
  }, [categoriesList]);

  const handleAddCategory = async () => {
    const newCategory = {
      name: categoryInput,
    };
    const result = await postHttp(`${mainUrl}/categories/create`, newCategory);
    const categories = [...categoriesList, result.data];
    setCategoriesList(categories);
    setCategoryInput("");
  };

  const handleActiveCategory = (id, activeState) =>{
    let toggle = !activeState
    console.log(activeState)
    putHttp(`${mainUrl}/categories/active/${id}`,
    {
      isActive: toggle,
    }).then(()=>{
      const category = categoriesList.find((c)=> c._id === id)
      category.isActive = !category.isActive
      setCategoriesList([...categoriesList])
    })
  };

  return (
    <div className="categories-form">
      <h2>ניהול קטגוריות </h2>
      <input
        onChange={(e) => {
          setCategoryInput(e.target.value);
        }}
        placeholder="הוספת קטגוריה"
        value={categoryInput}
      />
      <button disabled={categoryInput === ""} className="btn" onClick={handleAddCategory}>הוספה</button>
      {categoriesList &&
        categoriesList.map((category, index) => {
          return (
            <div className="category-column" key={index}>
              <label>{category.name}</label>
              <button className="btn" onClick={() => {handleActiveCategory(category._id, category.isActive)}}>
                {category.isActive ? 'השהה' : 'הפעל'}
                </button>
            </div>
          );
        })}
    </div>
  );
};

export default CategoriesForm;
