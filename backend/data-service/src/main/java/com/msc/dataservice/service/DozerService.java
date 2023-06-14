package com.msc.dataservice.service;

import org.dozer.DozerBeanMapper;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DozerService {

    private static DozerBeanMapper mapper;
    private static DozerBeanMapper getMapper() throws URISyntaxException {
        if(mapper == null){
            mapper = new DozerBeanMapper();
            URL res = DozerService.class.getClassLoader().getResource("dozer");
            assert res != null;
            File f = Paths.get(res.toURI()).toFile();
            mapper.setMappingFiles(Stream.of(Objects.requireNonNull(f.listFiles()))
                    .filter(file -> !file.isDirectory())
                    .map(e-> "dozer/" + e.getName())
                    .collect(Collectors.toList()));
        }
        return mapper;
    }

    public static <T> List<T> mapList(List<?> source, Class<T> destinationClass){
        return source.stream().map(e-> {
            try {
                return getMapper().map(e, destinationClass);
            } catch (URISyntaxException ex) {
                throw new RuntimeException(ex);
            }
        }).collect(Collectors.toList());
    }

    public static <D, S> D map(S source, Class<D> destination) throws URISyntaxException {
        return getMapper().map(source, destination);
    }

}
