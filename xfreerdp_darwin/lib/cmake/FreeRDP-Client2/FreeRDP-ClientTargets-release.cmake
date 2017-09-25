#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "freerdp-client" for configuration "Release"
set_property(TARGET freerdp-client APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(freerdp-client PROPERTIES
  IMPORTED_LINK_DEPENDENT_LIBRARIES_RELEASE "freerdp"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libfreerdp-client2.2.0.0.dylib"
  IMPORTED_SONAME_RELEASE "@rpath/libfreerdp-client2.2.dylib"
  )

list(APPEND _IMPORT_CHECK_TARGETS freerdp-client )
list(APPEND _IMPORT_CHECK_FILES_FOR_freerdp-client "${_IMPORT_PREFIX}/lib/libfreerdp-client2.2.0.0.dylib" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
