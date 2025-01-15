export class ColumnNumericTransformer {
  //convert number to two decimal places before saving in db
  to(data: number): number {
    return parseFloat(data.toFixed(2));
  }

  //convert number to float when fetching from db
  from(data: string): number {
    return parseFloat(data);
  }
}
