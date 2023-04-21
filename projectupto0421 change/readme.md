
在item-detail.component.ts里添加一个变量
  contactEmail!:string;
  
在item-detail.component.ts的constructor里添加一个参数
  private http: HttpClient
  
  
在item-detail.component.ts里添加一个方法
getContactEmail(userID:string){
  const myurl='http://localhost:3001/user/id/'+userID;
  const observer: Observer<any> = {
    next: response => {
      console.log('Response:', response);
      this.contactEmail=response.email;
    },
    error: error => {
      console.error('Error:', error);
      this.contactEmail="no email available for some reasons";
    },
    complete: () => {
      console.log('Request completed');
    }
  };
  this.http.get(myurl).subscribe(observer);
}


在item-detail.component.html里做一处修改
将如下位置那里hard code的email改成{{this.contactEmail}}
  <pre><p><strong>Contact:</strong> Email: {{this.contactEmail}}</p></pre>
  
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display Code as String</title>
</head>
<body>
    <pre>
&lt;p&gt;&lt;strong&gt;Contact:&lt;/strong&gt; Email: {{this.contactEmail}}&lt;/p&gt;
    </pre>
</body>
