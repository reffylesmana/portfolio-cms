"use client";

import { useState } from "react";

import { CategoryForm } from "@/components/categories/category-form";
import { CategoryList } from "@/components/categories/category-list";


interface Category {
  id: string;
  name: string;
  slug: string;
}


export default function CategoriesPage() {

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);



  function handleSuccess() {

    setEditingCategory(null);

    setRefreshKey((prev) => prev + 1);

  }



  function handleCancel() {

    setEditingCategory(null);

  }



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Categories
        </h1>


        <p className="text-muted-foreground">
          Manage project categories.
        </p>

      </div>



      <CategoryForm
        key={editingCategory?.id ?? "new"}
        editingCategory={editingCategory}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />



      <CategoryList
        key={refreshKey}
        onEdit={setEditingCategory}
      />


    </div>

  );

}