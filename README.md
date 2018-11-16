# Webpack cơ bản
Webpack hiện đang là module loader được sử dụng rộng rãi nhất hiện nay với cộng động support to lớn và những chức năng vô cùng mạnh mẽ. Phiên bản hiện tại là  `v4.1.3`.

###Vậy Module loader là gì?

 1. Một cách đơn giản là chúng ta thường add những thư viện (3th parties) như jquery, moment, select2, dtpicker,sticky,... vào thẻ script để khi web load lên xong thì những thư viện này sẽ được execute và xử lý. Nhưng không  chỉ vài dòng jquery là đủ dùng, sau này do việc code dưới front-end càng ngày càng phìng to nên việc quản lý code = javascript càng ngày càng tõ rõ sự quan trọng nên từ đó khái niệm module loader ra đời.

 2. Có khá nhiều thư viện từ nhỏ đến to ra đời cho việc này: Tiny Loaders (curl, LABjs, almond), RequireJS, Browserify, SystemJs, Webpack và gần đây đang nổi lên là RollupJs .

 3. Webpack ra đời từ thừa hưởng những thành quả và kinh nghiệm từ những thư viện SystemJs, Browserify  và phát triển lền một tầm mới tốt hơn cho công việc quản lý module.

# gulp-vs-webpack

##Giống 

Đều là các công cụ giúp tự động hóa các task  lặp đi lặp lại và kiểm tra lỗi trong quá trình phát triển. ví dụ như

    1.Thay thế một chuỗi của văn bản trong file
    2.Tạo ra các thư mục và di chuyển các file vào các thư mục đó
    3.Chạy các unit test với chỉ một lệnh duy nhất
    4.Refresh trình duyệt của tôi khi thay đổi code và lưu lại
    5.Kết hợp tất cả các file JavaScript vào một file, và tương tự với các file CSS
    6.Minify các file JavaScript và CSS đã được nối
    7.Chỉnh sửa vị trí của các thẻ <script> trên trang html
    
##Khác nhau 
1. gulp sử dụng Node.js

    webpack sử dụng javascript
2. gulp là một task runner có nghĩa là nó có thể xác định các nhiệm vụ và có thể dễ dàng chạy chỉ bằng cách gọi bằng tên.
 
   webpack là môt module bundler nó không có khái niệm này mà thay vào đó bạn có thể sử dụng các script npm kết hợp với node để có tác dụng tương tự. 

3. Gulp có cú pháp ngắn gọn và dễ hiểu hơn webpack. Nhưng webpack mạnh hơn gulp.

4. Gulp có thể xử lý các file tĩnh (css font img )tốt hơn Webpack. Các  Webpack Plugin cũng có thể sao chép tập tin từ nguồn của bạn để xây dựng thư mục của bạn,

5. Gulp compile, tối ưu các file của bạn và ghép chúng lại theo từng loại

    webpack đóng gói các file vã các file phụ thuộc thành một file js duy nhất có cấu trúc và chính suất chúng khi cần
    
6. webpack hỗ trợ cú pháp require(), imoprt(), biến những file đó thành file trình duyệt có thể hiểu được. Gulp thì không




### Phan se demo

[Cau truc co ban cua file webpack](https://webpack.js.org/configuration/)

development        Đặt process.env.NODE_ENVtrên DefinePlugingiá trị development. Cho phép NamedChunksPluginvà NamedModulesPlugin.




production     Đặt process.env.NODE_ENVtrên DefinePlugingiá trị production. Cho phép FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPluginvà UglifyJsPlugin.



none   Chọn không tham gia bất kỳ tùy chọn tối ưu hóa mặc định nào

















Code splitting (chia nhỏ code) là một trong những tính năng làm nên tên tuổi của Webpack. Và với riêng bản thân mình thấy thì đây chính là tính năng có giá trị nhất của webpack.

Code splitting là gì?
Như cái tên của nó. Nó cho phép chung ta chia nhỏ code ra và chỉ thật tải và execute khi cần đến. Một ví dụ đơn giản là chúng ta sử dụng thư viện select2 cho dự án, thật ra bản thân select2 là 1 library khá nặng và đương nhiên đa phần các page trong dự án của bạn ko cần đến nó, chỉ một vài trang cần và Webpack sẽ detect được khi nào bạn cần và sẽ tách nó ra 1 file riêng để khi nào cần thì gọi. Cái goal ở đây là ngoài việc chúng ta kiếm soát được việc quản lý library thì bên cạnh đó perfomance cũng được cải thiện ở browser thấy 1 thì ở mobile sự cải thiện sẽ rõ rệt hơn rất nhiều vì trên mobile phần cứng đa phần bị giới hạn hơn so với máy tính.


Code splitting có thể là một trong những feature thuyết phục nhất của Webpack, nó cho phép chúng ta chia nhỏ code ra nhiều bundle nhỏ hơn, những cái mà chúng ta có thể tải khi cần hoặc để tải song song. Nó thường được sử dụng để tạo ra những bundle code nhỏ hơn cũng như quản lý vấn đề ưu tiên tải tài nguyên, caí nào tải trước, cái nào tải sau, cái nào tải sau cái nào. Nếu sử dụng đúng cách nó có thể tác động lớn đến tốc độ và thời gian tải.

Có 3 cách tiếp cận để split code hiện tại: - Entry point: Phân chia thủ công bằng cách cấu hình file entry, file để bắt đầu chạy ứng dụng và từ đó webpack hoạt động - Prevent duplication (ở webpack 4.0 là splitChunks)


- Dynamic Imports: Chia code thông qua các function được gọi trong các modules. (cai nay chua demo duoc)