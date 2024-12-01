import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  productForm: FormGroup;
  currentPage = 1;
  pageSize = 10;
  totalProducts = 0;
  isEditing = false;
  editProductId: number | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        this.products = response.products;
        this.totalProducts = response.total;
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => (this.categories = categories),
      (error) => console.error('Error fetching categories:', error)
    );
  }

  submitForm(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEditing && this.editProductId) {
      this.productService.updateProduct(this.editProductId, productData).subscribe(
        () => {
          this.fetchProducts();
          this.resetForm();
        },
        (error) => console.error('Error updating product:', error)
      );
    } else {
      this.productService.createProduct(productData).subscribe(
        () => {
          this.fetchProducts();
          this.resetForm();
        },
        (error) => console.error('Error creating product:', error)
      );
    }
  }

  editProduct(product: any): void {
    this.isEditing = true;
    this.editProductId = product.ProductId;
    this.productForm.setValue({
      name: product.ProductName,
      categoryId: product.CategoryId,
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => this.fetchProducts(),
      (error) => console.error('Error deleting product:', error)
    );
  }

  resetForm(): void {
    this.isEditing = false;
    this.editProductId = null;
    this.productForm.reset();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchProducts();
  }
}
