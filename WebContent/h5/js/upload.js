$.html5Upload = function (param) {  
    var option = $.extend({  
        id: '',                         //上传界面唯一标识id  
        title: '',                       //标题文字  
        url: '',                        //文件上传后台处理地址  
        filter: null,                   //上传文件过滤函数，参数为files，必须返回files  
        fileNameLength: 50,             //显示文件名长度  
        onDelete: null,                  //当某一个上传文件上传成功之后（自动）或被删除（手动）的时候执行的方法。接受一个参数(file)，表示 当前删除文件。  
        onSuccess: null,                //当前文件上传成功执行的回调方法。接受两个参数(file, response)，表示当前上传成功的文件对象和后台返回的字符内容。  
        onFailure: null,                //当前文件上传失败执行的回调方法。接受两个参数(file, response)，表示当前上传失败的文件对象和后台返回的字符内容。  
        onComplete: null,               //当前文件对象列表全部上传完毕执行的回调方法。无可用参数。  
        onClose: null,                   //关闭上传界面后回调函数  
        auto: true                       //自动弹出文件选择框  
    }, param || {});  
  
    var xhr;  
    var upload = $('#divFileUpload_' + option.id);  //上传模块容器  
    if (upload.length != 0) {  
        upload.remove();  
    }  
    if ($('#file_upload').length == 0) {  
        $('body').append("<input type='file' multiple id='file_upload' style='width: 0px; height: 0px; position: absolute;left: -9999px; top: -9999px'>");  
        $('#file_upload').bind('change', function (e) {  
            funDealFiles(e.target.files || e.dataTransfer.files);  
            $('#file_upload').val('');  
        });  
    }  
    upload = $("<div class='upload' id='upload_" + option.id + "'>" +  
                    "<div class='upload_title' title='双击最小化窗口'>" + option.title + "<span class='upload_btn_mini upload_btn_mini_yc' title='最小化'></span></div>" +  
                    "<div class='upload_btn_div'>" +  
                        "<div class='upload_btn' id='upload_btn_select_" + option.id + "'>选择文件</div>" +  
                        "<div class='upload_btn' id='upload_btn_upload_" + option.id + "'>上 传</div>" +  
                        "<div class='upload_btn' id='upload_btn_close_" + option.id + "'>关 闭</div>" +  
                        "<div class='upload_drag' id='upload_drag_" + option.id + "'>或者将文件拖到此处</div>" +  
                    "</div>" +  
                    "<hr/>" +  
                    "<div class='upload_list' id='upload_list_" + option.id + "'></div>" +  
                "</div>").appendTo('body');  
  
    $('#upload_btn_select_' + option.id).click(function () {  
        //浏览  
        $('#file_upload').click();  
    });  
    $('#upload_btn_upload_' + option.id).click(function () {  
        //上传  
        sendFile();  
    });  
    $('#upload_btn_close_' + option.id).click(function () {  
        //关闭  
        if (confirm('确定关闭吗？')) {  
            if (option.onClose) {  
                option.onClose.call(this);  
            }  
            $('#upload_' + option.id).remove();  
        }  
    });  
    //拖拽上传  
    var dragDrop = $('#upload_drag_' + option.id)[0];  
    dragDrop.addEventListener("dragover", function (e) {  
        e.stopPropagation();  
        e.preventDefault();  
        $(this).addClass("upload_drag_hover");  
    }, false);  
    dragDrop.addEventListener("dragleave", function (e) {  
        e.stopPropagation();  
        e.preventDefault();  
        $(this).removeClass("upload_drag_hover");  
    }, false);  
    dragDrop.addEventListener("drop", function (e) {  
        e.stopPropagation();  
        e.preventDefault();  
        $(this).removeClass("upload_drag_hover");  
        funDealFiles(e.target.files || e.dataTransfer.files);  
    }, false);  
  
    $('.upload_title', upload).dblclick(function () {  
        $('.upload_btn_mini', upload).click();  
    });  
  
    $('.upload_btn_mini', upload).click(function () {  
        var _this = $(this);  
        var title = _this.attr('title');  
        if (title == '最小化') {  
            //最小化  
            _this.attr('title', '还原').removeClass('upload_btn_mini_yc').addClass('upload_btn_mini_hy').data('offset', upload.offset()).parent().attr('title','双击还原窗口');  
            upload.animate({ width: '200px', height: '33px', bottom: '10px', right: '10px' }, 200);  
        } else {  
            //还原  
            var offset = _this.data('offset');  
            upload.animate({ width: '480px', height: '290px', bottom: offset.top, right: offset.left }, function () {  
                upload.removeAttr('style');  
            });  
            _this.attr('title', '最小化').removeClass('upload_btn_mini_hy').addClass('upload_btn_mini_yc').parent().attr('title', '双击最小化窗口');  
        }  
    });  
  
    if (option.auto) {  
        $('#divFileUpload_btn_select_' + option.id).click();  
    }  
  
    //选中文件的处理与回调  
    var funDealFiles = function (files) {  
        //过滤文件  
        if (typeof (option.filter) == 'function') {  
            files = option.filter.call(this, files);  
        }  
        var i = 0;  
        var funAppendImage = function () {  
            var file = files[i];  
            if (file) {  
                var fileName = file.name.length > option.fileNameLength ? file.name.substr(0, option.fileNameLength) + '...' : file.name;  
                var fileDiv = $("<div class='upload_item' status='start'>" +  
                                    "<div class='upload_item_title' title='" + file.name + "'>" + fileName + "(" + (file.size / 1024).toFixed(2) + "kb)</div><div class='upload_item_del'>删除</div>" +  
                                    "<div class='upload_item_progress'>" +  
                                        "<div class='upload_item_progress_bg'></div>" +  
                                        "<div class='upload_item_progress_msg'></div>" +  
                                    "</div>" +  
                                "</div>").data('file', file).appendTo('#upload_list_' + option.id);  
                var cancle = fileDiv.find('.upload_item_del');  
                cancle.click(function () {  
                    //删除  
                    var tmp = $(this).parent();  
                    if (tmp.attr('status') == 'uploading') {  
                        if (confirm('确定删除当前文件吗？')) {  
                            xhr.abort();  
                        }  
                    } else {  
                        tmp.remove();  
                    }  
                });  
  
                //如果是图片，则显示缩略图  
                if (file.type.indexOf('image') != -1) {  
                    var reader = new FileReader();  
                    reader.onload = function (e) {  
                        //展示img     
                        $('.upload_item_title', fileDiv).before("<div class='upload_item_img'><img src='" + e.target.result + "'</div>");  
                    }  
                    reader.readAsDataURL(file);  
                }  
                i++;  
                funAppendImage();  
            } else {  
                //遍历结束  
  
            }  
        };  
        funAppendImage();  
    };  
  
    function sendFile() {  
        var list = $('.upload_item[status=start]', upload);  
        if (list.length == 0) {  
            if (typeof (option.onComplete) == 'function') {  
                //全部完成事件  
                option.onComplete.call();  
            }  
            return;  
        }  
        var fileDiv = list.eq(0).attr('status', 'uploading');  
        var file = fileDiv.data('file');  
        var msg = fileDiv.find(".upload_item_progress_msg");  
        var bg = fileDiv.find(".upload_item_progress_bg");  
  
        //上传到服务器  
        xhr = new XMLHttpRequest();  
        xhr.onreadystatechange = function () {  
            if (xhr.readyState == 4) {  
                if (xhr.status == 200) {  
                    fileDiv.attr('status', 'uploaded');  
                    //bg.css('width', '100%');  
                    var obj = eval("(" + xhr.responseText + ")");  
                    if (typeof (option.onSuccess) == 'function') {  
                        //上传成功事件  
                        option.onSuccess.call(this, obj);  
                    }  
                }  
                xhr = null;  
                sendFile();  
            }  
        };  
  
        xhr.upload.onprogress = function (e) {  
            //进度显示  
            if (e.lengthComputable) {  
                var percentage = Math.round((e.loaded * 100) / e.total);  
                msg.html(percentage + ' %');  
                bg.animate({ width: percentage + '%' }, 100);  
            }  
        };  
  
        xhr.onabort = function (e) {  
            fileDiv.remove();  
            sendFile();  
        }  
        xhr.onload = function (e) {  
  
        };  
        xhr.onerror = function (e) {  
            msg.html("上传失败！");  
            fileDiv.attr('status', 'error');  
            if (typeof (option.onFailure) == 'function') {  
                //上传失败事件  
                option.onFailure.call();  
            }  
            sendFile();  
        }  
        xhr.open('post', option.url, true);  
        var formData = new FormData();  
        formData.append("file", file);  
        xhr.send(formData);  
        msg.html("上传中...");  
    }  
};  