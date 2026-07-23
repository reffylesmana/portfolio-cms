import { categoryRepository } from "@/repositories/category.repository";

export const categoryService = {
  async getAll() {
    return categoryRepository.findAll();
  },

  async create(data: {
    name: string;
    slug: string;
  }) {
    const existing =
      await categoryRepository.findBySlug(
        data.slug
      );

    if (existing) {
      throw new Error("Slug already exists");
    }

    return categoryRepository.create(data);
  },

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
    }
  ) {
    return categoryRepository.update(
      id,
      data
    );
  },

  async delete(id: string) {
    return categoryRepository.delete(id);
  },
};