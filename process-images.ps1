Add-Type -AssemblyName System.Drawing

$sourceDir = Join-Path $PSScriptRoot "images"
$destDir = Join-Path $PSScriptRoot "public\assets\products"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$mapping = @{
    "191930.jpg.jpeg" = "live-edge-clock.jpg"
    "3893.jpg.jpeg"   = "kalpavriksha-mural.jpg"
    "4501.jpg.jpeg"   = "tribal-totem-trio.jpg"
    "4765.jpg.jpeg"   = "buddha-bust-wall-art.jpg"
    "5273.jpg.jpeg"   = "triptych-tree-panels.jpg"
    "5288.jpg.jpeg"   = "shahi-sawari-mural.jpg"
    "6227.jpg.jpeg"   = "hex-planter-cart.jpg"
    "6229.jpg.jpeg"   = "carved-leaf-box.jpg"
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)

foreach ($entry in $mapping.GetEnumerator()) {
    $srcPath = Join-Path $sourceDir $entry.Key
    $dstPath = Join-Path $destDir $entry.Value

    if (Test-Path $srcPath) {
        $original = [System.Drawing.Image]::FromFile($srcPath)
        $w = $original.Width
        $h = $original.Height
        
        $maxDim = 1400
        $scale = 1.0
        if ($w -gt $maxDim -or $h -gt $maxDim) {
            if ($w -gt $h) {
                $scale = $maxDim / $w
            } else {
                $scale = $maxDim / $h
            }
        }
        
        $newW = [int][math]::Round($w * $scale)
        $newH = [int][math]::Round($h * $scale)
        
        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        $g.DrawImage($original, 0, 0, $newW, $newH)
        $g.Dispose()
        $original.Dispose()
        
        $bmp.Save($dstPath, $codec, $encoderParams)
        $bmp.Dispose()
        
        $srcSize = (Get-Item $srcPath).Length / 1KB
        $dstSize = (Get-Item $dstPath).Length / 1KB
        Write-Host "Processed $($entry.Key) -> $($entry.Value): ${newW}x${newH} ($([math]::Round($srcSize,1)) KB -> $([math]::Round($dstSize,1)) KB)"
    }
}
