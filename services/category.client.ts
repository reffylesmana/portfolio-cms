export const categoryClient = {

  async getAll() {
    const response = await fetch(
      "/api/categories"
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ??
        "Failed to fetch categories"
      );
    }

    return data.data;
  },


  async create(
    name: string,
    slug: string
  ) {
    const response =
      await fetch(
        "/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
          }),
        }
      );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ??
        "Failed to create category"
      );
    }


    return data.data;
  },


  async delete(
    id: string
  ) {
    const response =
      await fetch(
        `/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ??
        "Failed to delete category"
      );
    }


    return data;
  },


  async update(
    id: string,
    data: {
      name: string;
      slug: string;
    }
  ) {
    const response =
      await fetch(
        `/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );


    const result =
      await response.json();


    if (!response.ok) {
      throw new Error(
        result.message ??
        "Failed to update category"
      );
    }


    return result.data;
  },

};