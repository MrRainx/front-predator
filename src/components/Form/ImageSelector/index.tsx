import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { ImageSelectorStoreProps, useImageSelector } from './state';
import { urltoFile } from './utils';

export interface ImageSelectorProps extends ImageSelectorStoreProps {
  onChange?: Function;
  value?: File;
  name?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = (props) => {
  const ref = useRef<any>(null);

  const webcamRef = useRef<Webcam>(null);
  const { setState, isVisible, preview, toggleDialog } = useImageSelector();

  useEffect(() => {
    setState(props);
  }, [props, setState]);

  const getValue = useCallback((value) => {
    return value instanceof File ? URL.createObjectURL(value) : value;
  }, []);

  return (
    <React.Fragment>
      {preview && (
        <div
          className="d-flex flex-column align-items-center justify-content-center my-2"
          style={{ maxHeight: '350px', width: '100%' }}
        >
          <div
            style={{
              maxHeight: '350px',
              display: 'grid',
              alignContent: 'center',
              textAlign: 'center',
            }}
            className="text-center"
          >
            <img
              src={getValue(props.value)}
              // alt="FOTO"
              className="img-fluid"
              style={{
                maxHeight: '300px',
              }}
              alt={props?.uuid}
              loading="lazy"
            />

            <span className="d-flex flex-row" style={{ minWidth: '50px' }}>
              <Button
                icon={PrimeIcons.IMAGE}
                className="rounded-0"
                type="button"
                onClick={() => ref?.current?.click?.()}
              >
                <input
                  id="foto"
                  type="file"
                  name={props?.name}
                  value=""
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(event) => {
                    const photo = event?.target?.files?.[0];
                    photo && props?.onChange?.(photo);
                  }}
                  hidden
                  ref={ref}
                />
              </Button>

              <Button
                icon={PrimeIcons.CAMERA}
                // variant="info"
                className="rounded-0"
                type="button"
                // block
                onClick={() => toggleDialog(true)}
              />
              {/* <Button
                icon={PrimeIcons.REPLAY}
                // variant="warning"
                className="rounded-0"
                type="button"
                // block
                onClick={() => props?.onChange?.(porpsdefaultValue)}
              /> */}
            </span>
          </div>
        </div>
      )}
      {isVisible && (
        <Dialog
          header="Capturar"
          visible={isVisible}
          onHide={toggleDialog}
          breakpoints={{ '960px': '100vw' }}
          style={{ width: '60vw', textAlign: 'center' } as CSSProperties}
          footer={null}
          draggable={false}
        >
          <Webcam
            style={{ maxWidth: '100%' }}
            audio={false}
            screenshotFormat="image/png"
            ref={webcamRef}
          />
          <span className="p-buttonset d-flex flex-row justify-content-center">
            <Button
              icon={PrimeIcons.PLAY}
              onClick={() => {
                try {
                  const imageSrc = webcamRef?.current?.getScreenshot?.();
                  urltoFile(imageSrc, 'img.jpg', 'image/jpeg').then((file) => {
                    props.onChange && props.onChange(file);
                    toggleDialog(false);
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            />
            <Button
              // variant="danger"
              icon={PrimeIcons.TIMES}
              //@ts-ignore
              onClick={toggleDialog}
            />
          </span>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default ImageSelector;
