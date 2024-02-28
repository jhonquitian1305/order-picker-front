import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  files: string[] = [];
  preview: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private validatorsService: ValidatorsService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<NewProductComponent>,
  ) {}

  productForm: FormGroup = this.fb.group({
    id: (''),
    name: ['', [ Validators.required, Validators.minLength(4) ]],
    price: [0, [ Validators.required, Validators.min(1000) ]],
    amount: [0, [ Validators.required, Validators.min(1), Validators.max(1000) ]],
    imageUrl: ('')
  })

  get currentProduct(): Product {
    return this.productForm.value;
  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.productForm, field);
  }

  onSubmit(){
    if(this.productForm.invalid) return;

    this.uploadImageAndSaveProduct();
  }

  saveProduct(): void {
    this.productService.saveOne(this.currentProduct)
      .subscribe(() => {
        this.toastr.success('Producto creado con éxito');
        this.isLoading = false;
        this.closeDialog();
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  uploadImageAndSaveProduct(){
    try {
      this.isLoading = true;
      const formData = new FormData();
      this.files.forEach(file => {
        formData.append('file', file);
      })
      this.productService.uploadFile(formData, this.currentProduct.name.toLowerCase())
        .subscribe( (file) => {
          this.currentProduct.imageUrl = file?.secure_url;
          this.saveProduct();
        });
    } catch (e) {
      this.isLoading = false;
      console.log('ERROR', e);
    }
    return;
  }

  chooseFile(){
    document.getElementById('file-input')?.click();
  }

  getFile(event: any){
    const capturedFile = event.target!.files[0]
    this.toBase64(capturedFile).then((image: any) => {
      this.preview = image.base;
    })
    this.files.unshift(capturedFile);
    this.files = this.files.splice(0,1);
  }

  toBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }

    return;
  })
}
