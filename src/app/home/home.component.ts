import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { VideoHolder,PostHolder,CommentHolder} from "../models/MultimediaModels";
import {VideoService} from '../services/video.service';


declare const commentReadMoreWithClassName:any;
declare const showBigPostWithClassName:any;
declare const skipVideoOnEnd:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private videoService:VideoService){

      console.log('HomeComponent constructor called');
  }

  async ngOnInit(): Promise<void> {

    await this.getVideos();
    await this.getPosts();
    await this.getPostComments();

    console.log('HomeComponent ngOnInit');

    skipVideoOnEnd();
    commentReadMoreWithClassName();
    showBigPostWithClassName();

  }
  ngAfterContentInit():void{
    console.log('HomeComponent ngAfterContentInit');
  }



//DEGUB INFO can see source code in chrome

//error cann't set listeners and use
//timeouts to wait for content to load
  ngAfterViewInit() {

    console.log('HomeComponent ngAfterViewInit');

  }


  ngOnDestroy(){
    console.log('HomeComponent ngOnDestroy')
  }

  private videoUrl ='../../assets/data/videos.json';
  private postUrl ='../../assets/data/post.json';
  private commentsUrl ='../../assets/data/comments.json';

  videos:VideoHolder[] = [];
  posts:PostHolder[] = [];
  comments:CommentHolder[] = [];


  addComment(commentData:string, postId:string):void{
    if( !postId || postId.length==0){
      return;
    }
    if( !commentData || commentData.length==0){
      return;
    }

    let post = this.posts.find(p=>p.postId==postId);
    let avatar = this.comments.find(c=>c.commentatorAvatar!=null);
    let comment = {
      commentId:"",
      textShortPart:"",
      textRemainingPart:"",
      postId:post.postId,
      commentatorAvatar:avatar.commentatorAvatar,
      commentText:commentData
    };

    this.divideCommentText(comment);
    post.comments.push(comment)
  }

  private divideCommentText(comment:CommentHolder):void{
    if(comment.commentText.length>133){
      comment.textShortPart = comment.commentText.slice(0,132);
      comment.textRemainingPart = comment.commentText.slice(133,comment.commentText.length-1);
    }else{
      comment.textShortPart = comment.commentText;
    }
  }

  async getVideos(){
    console.log('getting videos from component');

    let items = await this.videoService
      .getVideosFromUrl(this.videoUrl).toPromise();

    if(items){
      this.videos = items.data;
      console.log('videos retrieved');
      //Array.from(this.videos).forEach(v=>console.log(`${v.name}`));
    }

    // .subscribe((items:any)=>{
    //   this.videos = items.data;
    //   //Array.from(this.videos).forEach(v=>console.log(`${v.name}`));
    // });

  }

  async getPosts(){

    console.log('getting posts from component');

    let items = await this.videoService
    .getPostsFromUrl(this.postUrl).toPromise();

    if(items){
      this.posts = items.data;

      console.log('posts retrieved');

      Array.from(this.posts).forEach(post=>{
        // console.log(`${post.postId}`);
        // console.log(`${post.postText.length}`);
        // console.log(`${post.imageUrl}`);
        Array.from(post.comments).forEach(comment=>
          {
            // console.log(`${comment.commentId}`);
            // //console.log(`${comment.commentatorAvatar}`);
            // console.log(`${comment.commentText.length}`);

            this.divideCommentText(comment);

          });
      });
    }

    // .subscribe((items:any)=>{
    //   this.posts = items.data;

    //   Array.from(this.posts).forEach(post=>{
    //     // console.log(`${post.postId}`);
    //     // console.log(`${post.postText.length}`);
    //     // console.log(`${post.imageUrl}`);
    //     Array.from(post.comments).forEach(comment=>
    //       {
    //         // console.log(`${comment.commentId}`);
    //         // //console.log(`${comment.commentatorAvatar}`);
    //         // console.log(`${comment.commentText.length}`);

    //         this.divideCommentText(comment);

    //       });
    //   });

    // });

  }

  async getPostComments(){

    console.log('getting comments from component');

    let items = await this.videoService
      .getCommentsFromUrl(this.commentsUrl).toPromise();
    if(items){

      console.log('comments retrieved');

      this.comments = items.data;
      Array.from(this.comments).forEach(comment=>
        {
          //console.log(`${comment.commentId}`);
          //console.log(`${comment.commentatorAvatar}`);
        });
    }

    // .subscribe((items:any)=>{
    //   this.comments = items.data;
    //   Array.from(this.comments).forEach(comment=>
    //     {
    //       //console.log(`${comment.commentId}`);
    //       //console.log(`${comment.commentatorAvatar}`);
    //     });
    // });

  }





}
