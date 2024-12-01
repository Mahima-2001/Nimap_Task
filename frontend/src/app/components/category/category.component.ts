import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  newCategoryName = '';
  editCategoryId: number | null = null;
  editCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  // Fetch all categories
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => console.error('Error fetching categories:', error)
    );
  }

  // Create a new category
  addCategory(): void {
    if (!this.newCategoryName.trim()) {
      alert('Category name is required');
      return;
    }

    this.categoryService.createCategory(this.newCategoryName).subscribe(
      () => {
        this.fetchCategories();
        this.newCategoryName = '';
      },
      (error) => console.error('Error creating category:', error)
    );
  }

  // Enable edit mode for a category
  startEditing(category: any): void {
    this.editCategoryId = category.id;
    this.editCategoryName = category.name;
  }

  // Update a category
  updateCategory(): void {
    if (!this.editCategoryName.trim() || this.editCategoryId === null) {
      alert('Category name is required');
      return;
    }

    this.categoryService.updateCategory(this.editCategoryId, this.editCategoryName).subscribe(
      () => {
        this.fetchCategories();
        this.editCategoryId = null;
        this.editCategoryName = '';
      },
      (error) => console.error('Error updating category:', error)
    );
  }

  // Cancel editing
  cancelEditing(): void {
    this.editCategoryId = null;
    this.editCategoryName = '';
  }

  // Delete a category
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => this.fetchCategories(),
        (error) => console.error('Error deleting category:', error)
      );
    }
  }
}
