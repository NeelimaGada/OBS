import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(value:any[],searchString:string ){

		if(!searchString){
		  console.log('no search')
		  return value  
		}
 
		return value.filter(it=>{   
			const empId = it.employeeId.toString().includes(searchString) 
			const firstname = it.firstname.toLowerCase().includes(searchString.toLowerCase())
			
			console.log( empId + firstname );
			return ( empId + firstname );      
		}) 
	 }
}
