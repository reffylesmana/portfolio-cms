"use client";

import { useEffect, useState } from "react";

import { categoryClient } from "@/services/category.client";

import { Button } from "@/components/ui/button";


interface Category {
  id: string;
  name: string;
  slug: string;
}


interface CategoryListProps {
  onEdit: (
    category: Category
  ) => void;
}


export function CategoryList({
  onEdit,
}: CategoryListProps) {

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function fetchCategories() {

      try {

        const data =
          await categoryClient.getAll();

        setCategories(data);


      } catch (error) {

        console.error(error);


      } finally {

        setLoading(false);

      }

    }


    fetchCategories();

  }, []);



  async function handleDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete this category?"
      );


    if (!confirmDelete) return;


    try {

      await categoryClient.delete(id);


      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !== id
        )
      );


    } catch (error) {

      console.error(error);

    }

  }



  if (loading) {

    return (
      <p>
        Loading categories...
      </p>
    );

  }



  return (

    <div className="space-y-3">


      <h2 className="text-xl font-semibold">
        Existing Categories
      </h2>



      {categories.length === 0 ? (

        <p className="text-muted-foreground">
          No categories yet.
        </p>


      ) : (


        categories.map((category) => (

          <div
            key={category.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >

            <div>

              <p className="font-medium">
                {category.name}
              </p>


              <p className="text-sm text-muted-foreground">
                {category.slug}
              </p>

            </div>



            <div className="flex gap-2">


              <Button
                variant="outline"
                onClick={() =>
                  onEdit(category)
                }
              >
                Edit
              </Button>



              <Button
                variant="destructive"
                onClick={() =>
                  handleDelete(category.id)
                }
              >
                Delete
              </Button>


            </div>


          </div>

        ))

      )}


    </div>

  );

}