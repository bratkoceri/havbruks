using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Interfaces;

namespace LoggenFileStorage {
    public class FileStorageService : IFileStorageService {
        public async Task<string> SaveUploadedFile(Stream uploadedFile, string uploadedFileName) {
            var path = $"{Path.Combine(Directory.GetCurrentDirectory(), "Photos")}\\{uploadedFileName}";
            using FileStream fs =
                File.Create(path);
            await uploadedFile.CopyToAsync(fs);
            //For the sake of time I am hard coding the return picture path
            //This should be dynamic
            return $"http://localhost:41938/Photos/{uploadedFileName}";
        }
    }
}   
