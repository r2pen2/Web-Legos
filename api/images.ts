// Library Imports
import imageCompression from "browser-image-compression";

/**
 * A class used to interface with the {@link imageCompression} from "browser-image-compression".
 */
export class ImageCompressor {
  
  /** @static Default max image size after compression */
  static defaultMaxSizeMb = .75;

  /** @static Default max image size after compression */
  static defaultMaxWidthOrHeight = 1920;

  /**
   * @static
   * Default options for {@link imageCompression} library, used when calling static methods.
   */
  static defaultCompressionOptions = {
    maxSizeMb: ImageCompressor.defaultMaxSizeMb,
    maxWidthOrHeight: ImageCompressor.defaultMaxSizeMb,
  }

  /**
   * Options for {@link imageCompression} library, initialized to the default values
   */
  compressionOptions = ImageCompressor.defaultCompressionOptions;

  /**
   * Create an {@link ImageCompressor} with the specified options
   * @param _maxSizeMb - the maximum size of the image after compression
   * @param _maxWidthOrHeight - the maximum width or height of the image after compression
   */
  constructor(_maxSizeMb: number, _maxWidthOrHeight: number) {
    this.compressionOptions.maxSizeMb = _maxSizeMb;
    this.compressionOptions.maxWidthOrHeight = _maxWidthOrHeight;
  }

  /**
   * Compresses an HTMLImageElement with {@link defaultCompressionOptions} and returns the resulting (hopefully) smaller file
   * @param imageFile - the HTMLImageElement to compress
   * @returns A promise resolved with a File after compression has been applied.
   */
  static async compressImage(imageFile: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const compressedFile = await imageCompression(imageFile, ImageCompressor.defaultCompressionOptions);
        resolve(compressedFile);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  /**
   * Compresses an HTMLImageElement with the current {@link ImageCompressor} instance's options and returns the resulting (hopefully) smaller file
   * @param imageFile - the HTMLImageElement to compress
   * @returns A promise resolved with a File after compression has been applied.
   */
  async compressImage(imageFile: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const compressedFile = await imageCompression(imageFile, ImageCompressor.defaultCompressionOptions);
        resolve(compressedFile);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}