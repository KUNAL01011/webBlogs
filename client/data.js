const data = {
    "blog": {
        "_id": "660143878f1820dfe14204c4",
        "title": "Speed Up Your Site Instantly With Lazy Loaded Images - Advanced Lazy Loading",
        "summary": "Lazy loading images is one of the easiest ways to speed up the load times of your site since the most basic form of lazy loading only requires one line of code. However",
        "mainImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nancy_jewel_Mcdonie.jpg/604px-Nancy_jewel_Mcdonie.jpg",
        "content": "<h2>What Is Lazy Loading?</h2><p>Lazy loading is a technique used to defer the loading of an asset until it is needed. In the case of images, this means that the image will not be downloaded until the user scrolls to the point where the image is visible on the screen. This is a greatway to speed up your site since you are only downloading the images that the user will actually see. This is especially useful for sites with a lot of images since you can save a lot of bandwidth by only downloading the images that the user will actually see.</p><p>If you have a fast internet speed or you only ever view sites with small, well optimized images, you may not see the advantage to lazy loading images since you can download all the images almost instantly, but for everyone else lazy loaded images area game changer. This also isn’t just for people with super slow internet connection either. Images are one of, if not, the largest asset your user will download so even if they have a fast internet connection, lazy loading images can still make ahuge difference in the load time of your site.</p><p><br></p><h2>Basic Lazy Loading</h2><p>As I mentioned at the start of this article, lazy loading images is as simple as adding a single attribute to your image tag. The&nbsp;<code style=\"color: var(--theme-text);\">loading</code>&nbsp;attribute can be set to&nbsp;<code style=\"color: var(--theme-text);\">lazy</code>&nbsp;to enable lazy loading on the image. The browser will automatically determine when to download the image based on how close the image is to being on the screen.</p><pre spellcheck=\"false\">&lt;img src=\"image.jpg\" loading=\"lazy\" /&gt;</pre><p>All of the images on this page are lazy loaded so you will notice that if you scroll down the page, the images will not load until they are almost on the screen. You can easily see this by viewing the Network tab and filtering to just image requests.</p><p>When you look in the Network tab you may notice that each image has a random id attached to it. The reason I did this was because if you load the same image on your page multiple times the browser will only download it once so I added a unique id to eachimage so the browser would think they are different images and download them individually so you can see the effects of lazy loading in your dev tools.</p><p><br></p>",
        "conclusion": "Lazy loading images is a pretty simple technique that can be used to improve the user experience of your website. The simplest version of lazy loading only takes a single line of code, but it can be expanded to some pretty neat loading techniques with not too much additional code.",
        "imageCloudId": "v2kf0zaxbs9i5wvlfsjc",
        "owner": "66013691f0e13bb7f9bdd9b0",
        "createdAt": "2024-03-25T09:26:31.609+00:00",
        "updatedAt": "2024-03-25T09:26:31.609+00:00"
    },
    "user": {
        "_id": "66013691f0e13bb7f9bdd9b0",
        "fullName": "Nancy McDonie",
        "email": "nancy@gmail.com",
        "avatar":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nancy_jewel_Mcdonie.jpg/604px-Nancy_jewel_Mcdonie.jpg",
        "postId": [
            {
                "_id": ""
            }
        ],
        "createdAt": "2024-03-25T08:32:17.846+00:00",
        "updatedAt": "2024-03-25T08:34:26.235+00:00"
    }
};


export default data;
