Here is the English translation of the provided guidelines for a Product & Service based website:

**Product & Service based website Homepage:**

1.  For the logo on the homepage, you can use a PNG file. Ensure the background is removed.
2.  Keep the menu text size regular.
3.  The background color will be full on both sides of the menu and logo, but there will be a gap on both sides of the text and logo image.
4.  There will be gaps on both sides of the Carousel, aligned with the logo and menu text.
5.  The height of the Carousel should be such that an idea of the section below is visible.
6.  For service or product websites, keep at least 4 cards in each row. The card size should not be too large.
7.  The cards should contain relevant information, such as an image, title, price, and review (if available, it's good).
8.  For product or service pages, the product or service should be highlighted. Present the products in various ways. For example, in the case of an e-commerce website, you can see Hot Products, Best Products, and All Products. You can categorize products into different sections like this. The same applies to services.
9.  The website can have 1-2 promotional banners.
10. For the footer, you can divide it into 3-4 columns. These can include the company logo + tagline, menu or additional pages, newsletter, and social media links in another column. Besides this, payment and other information can be included.
11. The content of the website should be written in your own words. Avoid copying and pasting.
12. When writing taglines, they should be dynamic. For example, for the homepage tagline, it would be good to have "[Domain Name] Homepage". For the login page, "Login Page" and so on for Product/Service details pages.

**Product/Service Details Page:**

1.  This page must have a navbar.
2.  The design of the product details page will start according to the gap between the logo and menu text in the navbar.
3.  

**Cart Page:**

1.  Users will have the opportunity to update information on this page. If the user wants, they can increase or decrease the service date or product quantity from this page.
2.  If there is a coupon system, it can be managed from this page.

**Checkout Page:**

1.  This page will include the delivery address and payment information.
2.  The order will essentially be placed once it is confirmed from the checkout page.

**Overall:**

1.  The design of each page will be responsive (for mobile, tablet, and desktop).
2.  It would be good to use a maximum of 2 fonts throughout the entire website.
3.  For color usage, you can check these two sites: [WebAim Contrast Checker](https://webaim.org/resources/contrastchecker/) and [RealTime Colors](https://www.realtimecolors.com/).
4.  The gap between one section and another should not be too large.
5.  You can take ideas from similar types of websites for color usage.
6.  A hover effect can be used inside the cards.
7.  Attention should be paid to ensure the website's loading time is low.
8.  In addition to this, you can design some additional pages for the website, such as About Us, Company Policy, Contact, or others.

**Dashboard Design:**

1.  It would be good to keep the dashboard as black and white as possible.
2.  The dashboard will have a navbar for the dashboard, but there will be no footer.
3.  There will be at least 5-6 menus in the dashboard based on roles.
4.  There will be a menu named "Overview/Dashboard" for all roles, which will contain statistical information. There will be three sections: the first section will have 3-4 cards, the second section will have 1-2 charts, and the third section will have 1-2 tables. You can include more if you want.
5.  The design inside the "My Profile" page should take up the full page. You can take ideas from social media profile pages if you want.
6.  For adding information, it would be good if the forms are designed to take up the full page. In that case, you can have 2-3 form fields in one line if you want. You can use a Modal for keeping less information.
7.  "My Profile" and "Logout" will be in the menu.


















 err: CastError: Cast to ObjectId failed for value "verify" (type string) at path "user" for model "Order"
    at SchemaObjectId.cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\schema\objectId.js:250:11)
    at SchemaObjectId.SchemaType.applySetters (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\schemaType.js:1255:12)
    at SchemaObjectId.SchemaType.castForQuery (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\schemaType.js:1673:17)
    at cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\cast.js:390:32)
    at model.Query.Query.cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:4889:12)
    at model.Query.Query._castConditions (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:2306:10)
    at model.Query._find (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:2333:8)
    at model.Query.exec (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:4438:80)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  stringValue: '"verify"',
  messageFormat: undefined,
  kind: 'ObjectId',
  value: 'verify',
  path: 'user',
  reason: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer
      at new ObjectId (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\bson\src\objectid.ts:120:15)  
      at castObjectId (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\cast\objectid.js::25:12)
      at SchemaObjectId.cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\schema\objjectId.js:248:12)
      at SchemaObjectId.SchemaType.applySetters (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\monggoose\lib\schemaType.js:1255:12)
      at SchemaObjectId.SchemaType.castForQuery (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\monggoose\lib\schemaType.js:1673:17)
      at cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\cast.js:390:32)
      at model.Query.Query.cast (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.jjs:4889:12)
      at model.Query.Query._castConditions (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\\lib\query.js:2306:10)
      at model.Query._find (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:23333:8)
      at model.Query.exec (E:\1.Next_Level\Assignments\4.CarShop\CarSure-backend\node_modules\mongoose\lib\query.js:44388:80),
  valueType: 'string'
}
