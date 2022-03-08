using System;
using System.IO;
using System.Threading.Tasks;

namespace Shared.Interfaces
{
    public interface IFileStorageService {
        Task<string> SaveUploadedFile(Stream uploadedFile, string uploadedFileName);
    }
}
