import { EventEmitter, Injectable } from '@angular/core';
import { DepartmentService } from './department.service';
import { Product } from './models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer:any[] =[
    {id:1,name:"Laptop",department_id:4, price:40,description:"laptop novo"},
    {id:2,name:"Celular",department_id:2, price:50,description:"Celular novo"},
    {id:1,name:"Polo",department_id:4, price:66,description:"Camisete polo nova"},
    {id:1,name:"Caregador",department_id:4, price:7,description:"Caregador novo"},
  ]

  private products:Product[] = [];
  private nextID:number;
  onNewProduct:EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private departmentService:DepartmentService) 
   {
      for(let p of this.dataFromServer){
        this.products.push({
          id:p.id,
          name:p.name,
          description:p.description,
          price:p.price,
          department:this.departmentService.getDeparetmentById(p.id)

        });
        this.nextID = p.id+1;
      }
   }

  getProducts():Product[]{
    return this.products;
  }
  addProduct(p:Product){
    let prod: Product ={ id:this.nextID++,...p};
    this.products.push(prod);
    console.log(this.products);
    this.onNewProduct.emit(prod)
  }

}
