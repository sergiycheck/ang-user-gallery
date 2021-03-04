export interface VideoHolder{
  name:string;
  link:string;
}
export interface PostHolder{
  postId:string;
  imageUrl:string;
  authorAvatar:string;
  postText:string;
  comments:CommentHolder[]
}
export interface CommentHolder{
  postId:string;
  commentId:string;
  commentatorAvatar:string;
  commentText:string;
  textShortPart:string;
  textRemainingPart:string;

}
export interface Response<T>{
  data:T;
}
