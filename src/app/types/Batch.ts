export interface Batch{
  batchId:string,
  mentorId:string,
  menteeIds:string[],
  description:string,
  startDate:Date,
  endDate:Date,
  status:string
}
