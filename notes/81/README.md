```elisp
(when (>= emacs-major-version 24)
  (require 'package)
  (package-initialize)
  (add-to-list 'package-archives '("melpa", "http://melpa.org/packages/") t)
  )
(require 'cl)

(defvar goku/packages'(
                company
                ) "Default packages")
                
(defun goku/packages-installed-p()
  (loop for pkg in goku/packages
     when (not (package-installed-p pkd)) do (return nil)
     finally (return i)))
     
(unless (goku/packages-install-p)
  (message "%s" "Refreshing package database...")
  (package-refresh-contents)
    (when (not (package-installed-p pkg))
      (package-install pkg))))
```
