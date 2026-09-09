$body = @{
    email = "test_check_12345@teacher.madrasa.com"
    password = "testpassword123"
} | ConvertTo-Json

$headers = @{
    "apikey" = "sb_publishable_xGFE4JO5yMzYW7fIG3f1xg_1fEn300G"
    "Content-Type" = "application/json"
}

try {
    $res = Invoke-WebRequest -Uri "https://oqhnaxolmqxifyjyzufj.supabase.co/auth/v1/token?grant_type=password" -Method Post -Headers $headers -Body $body
    Write-Host "SUCCESS: " $res.Content
} catch [System.Net.WebException] {
    $resp = $_.Exception.Response
    if ($resp) {
        $stream = $resp.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response Body: " $reader.ReadToEnd()
    } else {
        Write-Host "No response object"
    }
}
