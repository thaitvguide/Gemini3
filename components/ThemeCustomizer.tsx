import React from 'react';
import { useTheme } from './ThemeProvider';
import { THEMES } from '../constants';
import { ThemeName } from '../types';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export const ThemeCustomizer: React.FC = () => {
  const { themeName, setThemeName, isDark, toggleDarkMode } = useTheme();

  return (
    <Card className="w-full border-dashed">
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
        <CardDescription>Customize the look and feel of the application instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Color Mode</Label>
          <div className="flex items-center space-x-2">
             <Switch id="mode-toggle" checked={isDark} onCheckedChange={toggleDarkMode} />
             <Label htmlFor="mode-toggle">Dark Mode</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Color Palette</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {Object.values(THEMES).map((theme) => (
              <Button
                key={theme.name}
                variant="outline"
                size="sm"
                onClick={() => setThemeName(theme.name as ThemeName)}
                className={themeName === theme.name ? 'border-primary ring-1 ring-primary' : ''}
              >
                <span
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: theme.activeColor }}
                />
                {theme.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
