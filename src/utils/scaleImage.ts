/**
 * 이미지 크기를 조절하는 함수
 * @param {File} file - 원본 이미지 파일
 * @param {number} scale - 이미지 크기 조절 비율 (0 ~ 1)
 * @param {string} format - 출력 이미지 형식 (기본값: 'image/jpeg')
 * @param {number} quality - 출력 이미지 품질 (0 ~ 1)
 * @returns {Promise<Blob>} - 크기가 조절된 이미지 Blob 객체
 */

interface ScaleImageOptions {
  file: File; // 원본 이미지 파일
  scale: number; // 이미지 크기 조절 비율 (0 ~ 1)
  format?: string; // 출력 이미지 형식 (기본값: 'image/jpeg')
  quality?: number; // 출력 이미지 품질 (0 ~ 1)
}

export const scaleImage = ({
  file,
  scale,
  format,
  quality = 0.8,
}: ScaleImageOptions): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        if (ctx) {
          // ctx가 null이 아닌 경우에만 코드 실행
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
          // null인 경우에 대한 처리
          throw new Error('Canvas의 2D 컨텍스트를 가져오지 못했습니다.');
        }

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else
              reject(
                new Error('이미지 크기 조정에 실패했습니다. 다시 시도해주세요.')
              );
          },
          format,
          quality
        );
      };

      img.onerror = function () {
        reject(
          new Error('이미지를 불러오는데 실패했습니다. 다시 시도해주세요.')
        );
      };

      if (e.target?.result && typeof e.target.result === 'string') {
        img.src = e.target.result; // result가 string인 경우에만 할당
      } else {
        throw new Error('이미지 소스가 유효하지 않습니다.');
      }
    };

    reader.onerror = function () {
      reject(new Error('파일을 읽는데 실패했습니다. 다시 시도해주세요.'));
    };

    reader.readAsDataURL(file);
  });
};
