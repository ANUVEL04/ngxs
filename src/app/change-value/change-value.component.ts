import { Component, OnDestroy } from '@angular/core';
import { Select, setValue ,Store} from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { DecrementValue, IncrementValue, ResetValue, SetValue } from '../state/simple-value.action';
import { SimpleValueState } from '../state/simple-value.state';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss'],
})
export class ChangeValueComponent implements OnDestroy{
  @Select(SimpleValueState.value) value$!: Observable<number>;
  value!: number;

  private valueSubscription: Subscription;
  constructor (private store : Store) {
    this.valueSubscription=this.value$.subscribe((value: number)=>{
      this.value=value;
    });
    
  }
  ngOnDestroy(): void{
    this.valueSubscription.unsubscribe();
  }

  increment(): void {
    this.store.dispatch(new IncrementValue());
  }

  decrement(): void {
    this.store.dispatch(new DecrementValue());
  }
  resetValue(): void{
    this.store.dispatch(new ResetValue());
  }
  setValue(value: number | null): void{
    if(value){
      this.store.dispatch(new SetValue(value));
    }
    else{
      this.store.dispatch(new ResetValue());
    }
  }
}
