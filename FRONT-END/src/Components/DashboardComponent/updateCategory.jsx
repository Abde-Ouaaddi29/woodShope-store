import React, { useEffect, useRef, useState } from "react";
import { EditCategory } from "../../API/categories";
import { useParams } from "react-router-dom";

export default function UpdateCategory() {
  const [isCategorySent, setIsCategorySent] = useState(false);
  const [ErrorCateg, setErrorCateg] = useState(false);

  const newCategorie = useRef();
  const description = useRef();
  // const imageCategory = useRef();

  const { id } = useParams();
  // console.log(categorie?.id);

  // const fetchShowCategory = async () => {
  //   try {
  //     const response = await ShowCategory(id);
  //     setCategorie(response)
  //     console.log(categorie)
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchShowCategory();
  // }, []);

  // const navigate = useNavigate();

  const HandleUpdateCategorie = async (e) => {
    e.preventDefault();
    setIsCategorySent(false);

    const formData = new FormData();
    formData.append("name", newCategorie.current.value.trim());
    formData.append("desc", description.current.value.trim());
    // formData.append("image", imageCategory.current.files[0]); // Uncomment if you have an image

    console.log("Form Data: ", [...formData.entries()]);

    if (
      formData.get("name") ||
      formData.get("desc")
      // Add condition for the image if needed
    ) {
      try {
        await EditCategory(formData, id); // Pass formData directly
        setIsCategorySent(true);
        setErrorCateg(false);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      setErrorCateg(true);
      setIsCategorySent(false);
    }
  };

  useEffect(() => {
    if (isCategorySent) {
      newCategorie.current.value = "";
      description.current.value = "";
      // imageCategory.current.value = "";
    }
  }, [isCategorySent]);

  return (
    <>
      <div className="bg-gray-100 rounded-[10px] xl:px-14 px-5 py-10 shadow">
        <form action="" className=" space-y-4 " >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div>
              <label className="" htmlFor="name">
                categorie name
              </label>
              {ErrorCateg ? <span className="text-red-400 ml-2">*</span> : ""}

              <input
                className={
                  ErrorCateg
                    ? "w-full outline-yellow-300 mt-2 rounded-lg border border-red-200 p-3 text-sm"
                    : "w-full outline-yellow-300 mt-2 rounded-lg border border-gray-200 p-3 text-sm"
                }
                placeholder="categorie"
                id="name"
                type="text"
                ref={newCategorie}
                // defaultValue={categorie.name}
              />
            </div>
            <div>
              <label className="" htmlFor="description">
                description
              </label>
              {ErrorCateg ? <span className="text-red-400 ml-2">*</span> : ""}

              <textarea
                className={
                  ErrorCateg
                    ? "w-full outline-yellow-300 mt-2 rounded-lg border border-red-200 p-3 text-sm"
                    : "w-full outline-yellow-300 mt-2 rounded-lg border border-gray-200 p-3 text-sm"
                }
                placeholder="description"
                id="description"
                type="text"
                ref={description}
                // defaultValue={categorie.desc}
              />
            </div>
            {/* <div>
              <label className="" htmlFor="imageCategory">
                categorie image
              </label>
              {ErrorCateg ? <span className="text-red-400 ml-2">*</span> : ""}

              <input
                className={
                  ErrorCateg
                    ? "w-full outline-yellow-300 mt-2 rounded-lg border border-red-200 p-3 text-sm bg-white"
                    : "w-full outline-yellow-300 mt-2 rounded-lg border border-gray-200 p-3 text-sm bg-white"
                }
                type="file"
                ref={imageCategory}
              />
            </div> */}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              onClick={HandleUpdateCategorie}
              className="inline-block rounded-lg bg-green-600 px-5 py-3 font-medium text-white tracking-wider w-full mt-8 hover:bg-green-400 hover:scale-105 transition-all duration-700"
            >
              Modifier la categorie
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
