using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Shared.Interfaces;

namespace LoggenAPI.Controllers
{
    [Route("hblapi/files")]
    public class FilesController : Controller {
        private readonly IFileStorageService fileStorageService;

        public FilesController(IFileStorageService fsService) {
            fileStorageService = fsService;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadPicture(IFormFile file) {
            var s = file.OpenReadStream();
            return Ok(await fileStorageService.SaveUploadedFile(s, file.FileName));
        }
    }
}
