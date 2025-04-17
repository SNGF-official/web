import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Document as Pdf, Page as PdfPage, pdfjs } from "react-pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
import { Download, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface Pagination {
  current: number;
  last: number | null;
}

interface ViewerProps {
  url: string;
  filename: string;
  isPending?: boolean;
  noData?: boolean;
  onLoadError?: () => React.ReactNode;
  children?: React.ReactNode;
  onPageChange?: (current: number) => void;
  onNumPages?: (total: number) => void;
}
interface PaginationProps {
  maxSteps: number | null;
  activeStep: number;
  setActiveStep: (callback: (e: number) => number) => void;
}

export const HorizontalPagination: FC<PaginationProps> = ({
                                                            maxSteps,
                                                            activeStep,
                                                            setActiveStep,
                                                          }) => {
  const goNext = () => { setActiveStep((prev) => prev + 1); };
  const goBack = () => { setActiveStep((prev) => prev - 1); };

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-2xl border">
      <Button size="icon" variant="ghost" onClick={goBack} disabled={activeStep === 1 || maxSteps === 0}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm">{activeStep} / {maxSteps ?? "?"}</span>
      <Button size="icon" variant="ghost" onClick={goNext} disabled={activeStep === maxSteps || maxSteps === 0}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export const ErrorHandling = ({ errorMessage }: { errorMessage: string }) => (
  <div className="flex items-center gap-2 text-destructive">
    <AlertTriangle className="w-5 h-5" />
    <span className="text-sm">{errorMessage}</span>
  </div>
);

export const PdfViewer: FC<ViewerProps> = ({
                                             url,
                                             filename,
                                             isPending,
                                             noData,
                                             onLoadError,
  onNumPages,
  onPageChange,
                                             children,
                                           }) => {
  const loadErrorMessage = "Échec de chargement du document";
  const [pages, setPages] = useState<Pagination>({ current: 1, last: null });
  const [isLoading, setLoading] = useState(true);
  const pdfRef = useRef<HTMLDivElement>(null);

  const stopLoading = () => { setLoading(false); };
  const startLoading = useCallback(() => { setLoading(true); }, []);

  const setLastPage = ({ numPages }: { numPages: number }) => {
    setPages((e) => ({ ...e, last: numPages }));
  };

  useEffect(() => {
    startLoading();
    setPages({ current: 1, last: null });
  }, [url, startLoading]);

  useEffect(() => {
    onPageChange?.(pages.current);
  }, [pages.current, onPageChange]);

  useEffect(() => {
    if (pages.last) {
      onNumPages?.(pages.last);
    }
  }, [pages.last, onNumPages]);

  return (
    <div ref={pdfRef} className="w-full">
      <Card>
        {isPending && <Progress value={100} />}
        <div className="flex justify-between items-center px-4 pt-4">
          <CardHeader className="p-0">
            <h3 className="text-lg font-semibold text-[var(--base-green)]">{filename}</h3>
          </CardHeader>
          <div className="flex items-center gap-2">
            {url && !isLoading && (
              <HorizontalPagination
                maxSteps={pages.last}
                activeStep={pages.current}
                setActiveStep={(callback) => {
                  const newPage = callback(pages.current);
                  setPages((prev) => {
                    const clamped = Math.min(Math.max(newPage, 1), prev.last ?? 1);
                    return { ...prev, current: clamped };
                  });
                }}
              />
            )}
            {children}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              download={`${filename}.pdf`}
              data-testid="download-link"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="cursor-pointer" variant="ghost" size="icon">
                    <Download className="w-5 h-5"  />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Télécharger</span>
                </TooltipContent>
              </Tooltip>
            </a>
          </div>
        </div>
        <CardContent className="flex justify-center items-center p-4">
          {url ? (
            <Pdf
              onLoadSuccess={({ numPages }) => {
                setLastPage({ numPages });
                stopLoading();
              }}
              noData={
                noData || (
                  <span className="text-sm text-muted-foreground">
                    En attente du document ...
                  </span>
                )
              }
              error={onLoadError || <ErrorHandling errorMessage={loadErrorMessage} />}
              loading={<LoadingMessage />}
              file={!isPending ? url : null}
            >
              <PdfPage
                loading={<LoadingMessage />}
                onLoadSuccess={stopLoading}
                width={pdfRef.current ? pdfRef.current.clientWidth - 50 : undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={pages.current}
              />
            </Pdf>
          ) : (
            <span className="text-sm text-muted-foreground">En attente du document ...</span>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const LoadingMessage = () => (
  <span className="text-sm text-muted-foreground">Chargement du document ...</span>
);