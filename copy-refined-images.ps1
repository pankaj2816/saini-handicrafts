Add-Type -AssemblyName System.Drawing

$brainDir = "C:\Users\Lenovo\.gemini\antigravity\brain\a38ad7c1-8775-4063-ae39-d5db9ca4be6f"
$destDir = Join-Path $PSScriptRoot "public\assets\products"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$mapping = @{
    "refined_clock*"        = "live-edge-clock.jpg"
    "refined_kalpavriksha*" = "kalpavriksha-mural.jpg"
    "refined_totem*"        = "tribal-totem-trio.jpg"
    "refined_buddha*"       = "buddha-bust-wall-art.jpg"
    "refined_triptych*"     = "triptych-tree-panels.jpg"
    "refined_procession*"   = "shahi-sawari-mural.jpg"
    "refined_planter*"      = "hex-planter-cart.jpg"
    "refined_leaf_box*"     = "carved-leaf-box.jpg"
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

foreach ($pattern in $mapping.Keys) {
    $files = Get-ChildItem -Path $brainDir -Filter "$pattern.jpg" | Sort-Object LastWriteTime -Descending
    if ($files.Count -gt 0) {
        $srcFile = $files[0].FullName
        $targetName = $mapping[$pattern]
        $dstPath = Join-Path $destDir $targetName

        $original = [System.Drawing.Image]::FromFile($srcFile)
        $w = $original.Width
        $h = $original.Height

        $maxDim = 1200
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

        $dstSize = (Get-Item $dstPath).Length / 1KB
        Write-Host "Updated $($targetName) with 3D refined render: ${newW}x${newH} ($([math]::Round($dstSize,1)) KB)"
    }
}
