(function () {

    function FileUpload ($http) {

        this.uploadFileToUrl = function (file, uploadUrl, successCB, errorCB) {
            var fd = new FormData();
            fd.append('file', file);
            
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function() {
                console.log('File uploaded successfully');
                successCB();
            })
            .error(function(error) {
                console.error('Error uploading file - ' + error);
                errorCB(error);
            });
        };
    }

    app.service('FileUpload', FileUpload);

})();
