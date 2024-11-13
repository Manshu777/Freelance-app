<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserRegistrationResource\Pages;
use App\Models\UserRegestration;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;

class UserRegistrationResource extends Resource
{
    protected static ?string $model = UserRegestration::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image')
                    ->directory('User_pictures')
                    ->image(),

                Forms\Components\TextInput::make('User_Name')
                    ->required()
                    ->label('User Name'),

                Forms\Components\TextInput::make('Full_Name')
                    ->required()
                    ->label('Full Name'),

                Forms\Components\TextInput::make('Email')
                    ->email()
                    ->required()
                    ->unique(UserRegestration::class, 'Email'),

                Forms\Components\TextInput::make('Contact')
                    ->label('Contact Number')
                    ->nullable(),

                Forms\Components\TextInput::make('Date-Of-Birth')
                    ->numeric()
                    ->nullable(),

                Forms\Components\Select::make('role')
                    ->options([
                        'Freelancer' => 'Freelancer',
                        'Company' => 'Company',
                    ])
                    ->nullable(),

                Forms\Components\Select::make('gender')
                    ->options([
                        'Male' => 'Male',
                        'Female' => 'Female',
                        'Other' => 'Other',
                    ])
                    ->nullable(),

                    Forms\Components\TextInput::make('password')
                    ->password()
                    ->required()
                    ->label('Password'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                TextColumn::make('User_Name')
                    ->label('Username')
                    ->searchable(),

                TextColumn::make('Full_Name')
                    ->label('Full Name')
                    ->searchable(),

                TextColumn::make('Email')
                    ->searchable(),

                TextColumn::make('Contact')
                    ->label('Contact Number'),

                TextColumn::make('role')
                    ->label('Role'),

                TextColumn::make('gender')
                    ->label('Gender'),
            ])
            ->filters([
                // Add filters here if needed
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Define any related resource managers here
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserRegistrations::route('/'),
            'create' => Pages\CreateUserRegistration::route('/create'),
            'view' => Pages\ViewUserRegistration::route('/{record}'),
            'edit' => Pages\EditUserRegistration::route('/{record}/edit'),
        ];
    }
}
