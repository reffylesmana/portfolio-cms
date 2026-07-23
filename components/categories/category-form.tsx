"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { categoryClient } from "@/services/category.client";


interface CategoryFormProps {
  editingCategory?: {
    id: string;
    name: string;
    slug: string;
  } | null;

  onSuccess?: () => void;
  onCancel?: () => void;
}


function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}


export function CategoryForm({
  editingCategory,
  onSuccess,
  onCancel,
}: CategoryFormProps) {


  const [name, setName] = useState(
    editingCategory?.name ?? ""
  );

  const [slug, setSlug] = useState(
    editingCategory?.slug ?? ""
  );



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    try {

      console.log("submit:", {
        name,
        slug,
        editingCategory,
      });



      if (editingCategory) {

        const result =
          await categoryClient.update(
            editingCategory.id,
            {
              name,
              slug,
            }
          );


        console.log(
          "update success:",
          result
        );


      } else {

        const result =
          await categoryClient.create(
            name,
            slug
          );


        console.log(
          "create success:",
          result
        );

      }



      setName("");
      setSlug("");


      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }



    } catch (error) {

      console.error(
        "Category submit error:",
        error
      );

    }

  }



  function handleNameChange(
    value: string
  ) {

    setName(value);

    setSlug(
      generateSlug(value)
    );

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-lg p-4"
    >

      <div className="space-y-2">

        <Label>
          Name
        </Label>


        <Input
          value={name}
          onChange={(e) =>
            handleNameChange(
              e.target.value
            )
          }
          placeholder="Category name"
        />

      </div>



      <div className="space-y-2">

        <Label>
          Slug
        </Label>


        <Input
          value={slug}
          readOnly
          placeholder="Auto-Generated Slug"
        />

      </div>



      <div className="flex gap-2">

        <Button type="submit">

          {editingCategory
            ? "Update Category"
            : "Add Category"
          }

        </Button>



        {editingCategory && (

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

        )}

      </div>


    </form>

  );

}